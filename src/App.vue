<template>
  <Header />
  <router-view></router-view>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite?" /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    Header
  }
});
</script>

<style>
@import "./style/main.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>