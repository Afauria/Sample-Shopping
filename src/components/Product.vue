<template>
  <div class="product-container">
    <router-link class="product" :to="'/product/'+info.id">
      <img class="product-img" :src="info.image" />
      <h4 class="product-name">{{ info.name }}</h4>
      <div class="product-color" :style="{background: color}"></div>
      <div class="product-cost">￥{{ info.cost }}</div>
      <!-- @click.prevent阻止默认事件行为，否则会响应跳转 -->
      <div class="product-add-cart" @click.prevent="handleAddCart">加入购物车</div>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// import { ProductInfo } from "../store/product";
export default defineComponent({
  name: "Product",
  props: {
    //info可能为undefiend，使用的时候需要加!或者?
    //可以使用ProductInfo类声明变量类型
    info: Object
  },
  data() {
    return {
      //使用map获取值的时候会报错，需要断言as类型
      colorsMap: {
        白色: "#ffffff",
        金色: "#dac272",
        蓝色: "#233472",
        红色: "#f2352e"
      } as any
    };
  },
  computed: {
    color(): string {
      //info可能为undefiend，使用的时候需要加!或者?
      return this.colorsMap[this.info!.color];
    }
  },
  methods: {
    handleAddCart(id: number) {
      //ts类型检查，无$store属性
      this.$store.commit("addCart", this.info!.id);
    }
  }
});
</script>
<style scoped>
.product-container {
  width: 25%;
  float: left;
}
.product {
  display: block;
  margin: 16px;
  padding: 16px;
  border: 1px solid #dddee1;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  text-align: center;
  position: relative;
}
.product img {
  width: 100%;
}
h4 {
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product:hover h4 {
  color: #0070c9;
}
.product-color {
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #dddee1;
  border-radius: 50%;
  margin: 6px auto;
}
.product-cost {
  color: #de4037;
  margin-top: 6px;
}
.product-add-cart {
  display: none;
  padding: 4px 8px;
  background: #2d8cf0;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
}
.product:hover .product-add-cart {
  display: inline-block;
}
</style>