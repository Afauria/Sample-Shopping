<template>
  <div class="header">
    <router-link to="/list" class="header-left">电商网站示例</router-link>
    <router-link to="/cart" class="header-right">
      购物车
      <span v-if="getCartCount">{{getCartCount}}</span>
    </router-link>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  computed: {
    getCartCount(): number {
      return this.$store.state.cartList.length;
    }
  },
  setup: () => {
    const count = ref(0);
    return { count };
  }
});
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
a {
  text-decoration: none;
}
.header {
  position: relative;
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
}
.header-left {
  color: #fff;
  float: left;
  margin: 0px 32px;
}
.header-right {
  float: right;
  color: #fff;
  margin: 0px 32px;
}
.header-right span {
  background: #f00;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: inline-block;
  text-align: center;
  line-height: 16px;
}
</style>