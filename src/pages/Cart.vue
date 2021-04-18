<template>
  <div class="cart">
    <div class="cart-header">
      <div class="cart-header-title">购物清单</div>
      <div class="cart-header-main">
        <div class="cart-info">商品信息</div>
        <div class="cart-price">单价</div>
        <div class="cart-count">数量</div>
        <div class="cart-cost">小计</div>
        <div class="cart-delete">删除</div>
      </div>
      <div class="cart-content">
        <div class="cart-item" v-for="(item,index) in cartList">
          <div class="cart-info">
            <img :src="productDictList[item.id].image" />
            {{productDictList[item.id].name}}
          </div>
          <div>￥{{ productDictList[item.id].cost }}</div>
          <div>
            <span class="cart-item-minus" @click="handleCount(index, -1)">-</span>
            {{ item.count }}
            <span class="cart-item-add" @click="handleCount(index, 1)">+</span>
          </div>
          <div>{{ item.count * productDictList[item.id].cost }}</div>
          <div class="cart-item-delete" @click="handleDelete(index)">删除</div>
        </div>
        <div class="cart-empty" v-if="!cartList.length">购物车为空</div>
      </div>
      <div class="cart-promotion" v-show="cartList.length">
        使用优惠码
        <input type="text" v-model="promotionCode" />
        <button style="margin-left: 10px; cursor:pointer;" @click="handlePromotion">验证</button>
      </div>
      <div class="cart-footer" v-show="cartList.length">
        <div class="cart-footer-desc">
          共计
          <span>{{countAll}}</span>件商品
        </div>
        <div class="cart-footer-desc">
          应付总额
          <span>￥{{costAll - promotion}}</span>
          <br />
          <template v-if="promotion">
            （优惠
            <span>¥ {{ promotion }}</span>）
          </template>
        </div>
        <div class="cart-footer-desc">
          <div class="cart-order" @click="handleOrder">现在结算</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      promotionCode: "",
      promotion: 0
    };
  },
  //计算属性有缓存，数据改变才会刷新
  //方法没缓存，每次都需要执行方法
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
    productDictList() {
      const productList = [...this.$store.state.productList];
      //需要声明字典类型
      const dict: { [key: number]: any } = {};
      productList.forEach((element: any) => {
        dict[element.id] = element;
      });
      return dict;
    },
    countAll() {
      let count = 0;
      this.$store.state.cartList.forEach((element: any) => {
        count += element.count;
      });
      return count;
    },
    costAll() {
      let cost = 0;
      this.cartList.forEach((item: any) => {
        cost += this.productDictList[item.id].cost * item.count;
      });
      return cost;
    }
  },
  methods: {
    handleCount(index: number, count: number) {
      if (count < 0 && this.cartList[index].count === 1) {
        return;
      }
      this.$store.commit("editCart", { id: this.cartList[index].id, count });
    },
    handleDelete(index: number) {
      this.$store.commit("deleteCart", this.cartList[index].id);
    },
    handlePromotion() {
      if (this.promotionCode === "") {
        this.promotion = 0;
        window.alert("请输入优惠码");
      } else if (this.promotionCode !== "Vue.js") {
        this.promotion = 0;
        window.alert("验证码错误");
      } else {
        this.promotion = 500;
      }
    },
    handleOrder() {
      this.$store.dispatch("buy").then(() => {
        window.alert("购买成功！");
      });
    }
  }
});
</script>
<style scoped>
.cart {
  margin: 32px;
  background: #fff;
  border: 1px solid #dddee1;
  border-radius: 10px;
}
.cart-header-title {
  padding: 16px 32px;
  border-bottom: 1px solid #dddee1;
  border-radius: 10px 10px 0 0;
  background: #f8f8f9;
}
.cart-header-main {
  padding: 8px 32px;
  overflow: hidden;
  border-bottom: 1px solid #dddee1;
  background: #eee;
  overflow: hidden;
}
.cart-header-main div {
  text-align: center;
  float: left;
  font-size: 14px;
  width: 10%;
}
.cart-info {
  /* !important优先级最高 */
  width: 60% !important;
  text-align: left !important;
}
.cart-item {
  padding: 0 32px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px dashed #e9eaec;
  overflow: hidden;
}
.cart-item div {
  text-align: center;
  float: left;
  width: 10%;
}
.cart-item img {
  width: 40px;
  height: 40px;
  position: relative;
  top: 10px;
}
.cart-item-minus,
.cart-item-add {
  display: inline-block;
  margin: 0 4px;
  width: 24px;
  height: 24px;
  line-height: 22px;
  text-align: center;
  background: #f8f8f9;
  border-radius: 50%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  /* 避免双击选中文本 */
  user-select: none;
}
.cart-item-delete {
  cursor: pointer;
  color: #2d8cf0;
}
.cart-empty {
  margin: 32px;
  text-align: center;
}
.cart-promotion {
  padding: 16px 32px;
}
.cart-footer {
  padding: 32px;
  text-align: right;
}
.cart-footer-desc {
  display: inline-block;
  padding: 0 16px;
}
.cart-footer-desc span {
  color: #f2352e;
  font-size: 20px;
}
.cart-order {
  display: inline-block;
  padding: 8px 32px;
  border-radius: 6px;
  background: #2d8cf0;
  color: #fff;
  cursor: pointer;
}
</style>