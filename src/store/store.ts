import { reactive } from "vue";
import { createStore } from "vuex";
import productList from "./product";

const state = {
  productList: [] as any[],
  cartList: [] as any[]
};

function getFilterArray(arr: Array<String>): Set<String> {
  const res = new Set();
  arr.forEach(element => {
    res.add(element);
  });
  return res;
}

const getters = {
  //踩坑: getters第一个参数为state
  //如果不传state，直接使用store的state，action异步刷新的时候，getters视图不会触发更新
  brands(state: any) {
    const brands = state.productList.map((item: any) => item.brand);
    return getFilterArray(brands);
  },
  colors(state: any) {
    const colors = state.productList.map((item: any) => item.color);
    return getFilterArray(colors);
  }
};

export default createStore({
  state,
  getters,
  mutations: {
    setProductList(state, data: any[]) {
      state.productList = data;
    },
    // 添加到购物车
    addCart(state, id: number) {
      const isAdded = state.cartList.find((item: any) => item.id === id);
      if (isAdded) {
        isAdded.count++;
      } else {
        //数组添加用push
        state.cartList.push({ id, count: 1 });
      }
    },
    // 修改商品数量
    editCart(state, payload) {
      //mutation只接收两个参数，第二个参数需要进行包装
      const product = state.cartList.find(
        (item: any) => item.id === payload.id
      );
      product.count += payload.count;
    },
    // 删除购物车商品
    deleteCart(state, id: number) {
      const index = state.cartList.findIndex((item: any) => item.id === id);
      state.cartList.splice(index, 1);
    },
    // 清空购物车
    clearCart(state) {
      state.cartList = [];
    }
  },
  actions: {
    getProductList(context) {
      //异步模拟请求
      setTimeout(function() {
        context.commit("setProductList", productList);
      }, 500);
    },
    buy(context) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit("clearCart");
          resolve();
        }, 500);
      });
    }
  }
});

//自定义状态管理：使用reactive监听变量
//reactive监听复杂数据类型，ref监听基本数据类型
// const store = {
//   debug: true,

//   state: reactive({
//     message: "Hello!"
//   }),

//   setMessageAction(newValue: string) {
//     if (this.debug) {
//       console.log("setMessageAction triggered with", newValue);
//     }

//     this.state.message = newValue;
//   },

//   clearMessageAction() {
//     if (this.debug) {
//       console.log("clearMessageAction triggered");
//     }

//     this.state.message = "";
//   }
// };
