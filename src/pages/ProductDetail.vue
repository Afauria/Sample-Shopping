<template>
  <div>
    <div class="product">
      <img :src="info.image" />
      <div class="product-info">
        <h1>{{ info.name }}</h1>
        <div class="product-cost">￥{{ info.cost }}</div>
        <div class="product-add-cart">加入购物车</div>
      </div>
    </div>
    <div class="product-desc">
      <h2>产品介绍</h2>
      <img v-for="i in 10" :src="info.imageDetail" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import productList from "../store/product";
export default defineComponent({
  data() {
    return {
      id: parseInt(this.$route.params.id as string),
      info: Object
    };
  },
  methods: {
    getProduct() {
      setTimeout(() => {
        //ts类型检查，undefined无法赋值给info，需要加as断言类型
        //不确定某个变量值的类型，或者希望不被类型约束，可以声明为any
        //null和undefined是所有类型的子类型
        this.info = productList.find(item => item.id === this.id) as any;
      }, 500);
    }
  },
  mounted() {
    this.getProduct();
  }
});
</script>
<style scoped>
.product {
  display: flex;
  border: 1px solid #dddee1;
  border-radius: 10px;
  background: #fff;
  align-items: center;
  margin: 32px;
  padding: 32px;
}
.product img {
  width: 50%;
}
.product-info {
  width: 50%;
}
.product-cost {
  color: #de4037;
  margin: 8px 0;
}
.product-add-cart {
  color: #fff;
  display: inline-block;
  padding: 8px 64px;
  margin: 8px 0;
  border-radius: 4px;
  background: #2d8cf0;
  cursor: pointer;
}
.product-desc {
  border: 1px solid #dddee1;
  border-radius: 10px;
  background: #fff;
  margin: 32px;
  padding: 32px;
}
.product-desc img {
  display: block;
  width: 50%;
  margin: 32px auto;
  padding: 32px;
  border-bottom: 1px solid #dddee1;
}
</style>