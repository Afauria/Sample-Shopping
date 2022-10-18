<template>
<h1>{{ msg }}</h1>

    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
      +
      <a
        href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
        target="_blank"
      >Vetur</a>
      or
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      (if using
      <code>&lt;script setup&gt;</code>)
    </p>

    <p>
      See
      <code>README.md</code> for more information.
    </p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a> |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button @click="count++">count is: {{ count }}</button>
    <router-link to="/list/">2222</router-link>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  // setup 运行在beforeCreate和created之前，替代这两个生命周期
  // 在执行 setup 时尚未创建组件实例，因此在 setup 选项中没有 this。
  // 即除了 props 之外，你将无法访问组件中声明的任何属性——本地状态、计算属性或方法。
  setup: () => {
    const count = ref(0);
    return { count };
  }
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
