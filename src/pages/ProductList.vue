<template>
  <div class="list-control">
    <div class="list-control-filter">
      <span>品牌：</span>
      <span
        class="list-control-filter-item"
        :class="{on: filterBrand===brand}"
        @click="handleFilterBrand(brand)"
        v-for="brand in brands"
      >{{ brand }}</span>
    </div>
    <div class="list-control-filter">
      <span>颜色：</span>
      <span
        class="list-control-filter-item"
        :class="{on: filterColor===color}"
        @click="handleFilterColor(color)"
        v-for="color in colors"
      >{{ color }}</span>
    </div>
    <div class="list-control-filter">
      <span>排序：</span>
      <span class="list-control-order-item" :class="{on: order === ''}" @click="handleOrder('')">默认</span>
      <span
        class="list-control-order-item"
        :class="{on: order === 'sales'}"
        @click="handleOrder('sales')"
      >
        销量
        <!-- v-show通过css隐藏标签：适用于需要显示/隐藏的标签，v-if是直接移除元素-->
        <!-- template标签不会渲染，直接渲染内容，无法通过css控制显示隐藏，因此只能用v-if -->
        <template v-if="order === 'sales'">↓</template>
      </span>
      <span
        class="list-control-order-item"
        :class="{on: order === 'cost-asc' || order === 'cost-desc'}"
        @click="handleOrder(order==='cost-asc'?'cost-desc':'cost-asc')"
      >
        价格
        <template v-if="order === 'cost-asc'">↑</template>
        <template v-if="order === 'cost-desc'">↓</template>
      </span>
    </div>
  </div>
  <Product v-for="item in filteredAndOrderedList" :info="item" />
  <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import Product from "../components/Product.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HelloWorld",
  components: {
    Product
  },
  data() {
    return {
      filterColor: "",
      filterBrand: "",
      order: ""
    };
  },
  computed: {
    list() {
      return (this as any).$store.state.productList;
    },
    brands() {
      //ts无法找到$store属性，会报错。可以使用as断言
      return (this as any).$store.getters.brands;
    },
    colors() {
      return (this as any).$store.getters.colors;
    },
    filteredAndOrderedList() {
      //拷贝一份列表
      let list = [...this.list];
      //filter不会修改原数组，需要重新赋值
      if (this.filterColor != "") {
        list = list.filter(item => item.color === this.filterColor);
      }
      if (this.filterBrand != "") {
        list = list.filter(item => item.brand === this.filterBrand);
      }
      if (this.order != "") {
        if (this.order === "sales") {
          list = list.sort((a, b) => b.sales - a.sales);
        } else if (this.order === "cost-desc") {
          list = list.sort((a, b) => b.cost - a.cost);
        } else if (this.order === "cost-asc") {
          list = list.sort((a, b) => a.cost - b.cost);
        }
      }
      return list;
    }
  },
  methods: {
    handleOrder(rule: string) {
      this.order = rule;
    },
    handleFilterBrand(rule: string) {
      if (this.filterBrand === rule) {
        this.filterBrand = "";
      } else {
        this.filterBrand = rule;
      }
    },
    handleFilterColor(rule: string) {
      if (this.filterColor === rule) {
        this.filterColor = "";
      } else {
        this.filterColor = rule;
      }
    }
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0);
    //setup中无法获取this Vue实例对象，需要使用useStore
    const store = useStore();
    store.dispatch("getProductList");
    return { count };
  }
});
</script>
<style scoped>
.list-control {
  background: #fff;
  border-radius: 6px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
.list-control-filter {
  margin-bottom: 16px;
}
.list-control-filter-item,
.list-control-order-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  margin-right: 6px;
  padding: 2px 6px;
}
.list-control-filter-item.on,
.list-control-order-item.on {
  background: #f2352e;
  border: 1px solid #f2352e;
  color: #fff;
}
.product-not-found {
  text-align: center;
  padding: 32px;
}
</style>