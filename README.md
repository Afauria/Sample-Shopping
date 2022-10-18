# Vue 3 + Typescript + Vite + Vuex4 + vue-router4

## 初始化工程

1. vite脚手架初始化工程：`npm create vite Sample-Shopping --template vue-ts`。`npm create`等价于`npm init`。

> npm create原理：会找到vite包运行`package.json`中配置的`create-vite`命令

1. `npm run dev`运行报错解决：`node .\node_modules\esbuild\install.js`

```shell
> sample-shopping@0.0.0 dev
> vite

events.js:292
      throw er; // Unhandled 'error' event
      ^

Error: spawn E:\FrontEndProject\sample-shopping\node_modules\esbuild\esbuild.exe ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:269:19)
    at onErrorNT (internal/child_process.js:465:16)
    at processTicksAndRejections (internal/process/task_queues.js:80:21)
Emitted 'error' event on ChildProcess instance at:
    at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
    at onErrorNT (internal/child_process.js:465:16)
    at processTicksAndRejections (internal/process/task_queues.js:80:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'spawn E:\\FrontEndProject\\sample-shopping\\node_modules\\esbuild\\esbuild.exe',
  path: 'E:\\FrontEndProject\\sample-shopping\\node_modules\\esbuild\\esbuild.exe',
  spawnargs: [ '--service=0.9.7', '--ping' ]
}
```
## 知识点

1. Vue3响应式数据声明：reactive和ref
   * reactive和ref可以监听属性，reactive监听复杂数据类型，ref监听基本数据类型


2. v-show和v-if

   * v-show通过css隐藏标签：适用于需要显示/隐藏的标签

   * v-if是直接移除元素

   * `<template>`标签不会渲染，直接渲染内容，无法通过css控制显示隐藏，因此只能用v-if


3. computed和method

   * 计算属性有缓存，数据改变才会刷新

   * 方法没缓存，每次都需要执行方法

   * 计算属性不能传递参数，传参需要使用闭包，即返回一个函数


```typescript
cacheSome () {
  return function (a) {
    return Date.now() + 'a'
  }
}
```

## 问题记录

1. TS具有类型检查，VSCode报错，不影响运行（强迫症看红字受不了）

> 如`this.$store`提示不存在$store属性。
>
> 可以使用`(this as any).$store`避免报错

* 声明any可以跳过类型检查
* 自定义声明文件，声明接口（太麻烦）

Vue+TS太折腾，网上的资料比较少，遇到问题只能自己解决。

2. 使用vuex getters显示数据，action异步获取数据的时候，视图不更新

> getters第一个参数为state。如果定义state，直接使用store的state不会触发刷新
>
> mutations同理，方法需要定义state参数，否则commit无法修改数据

```typescript
const getters = {
  //解决方案：加上state参数
  brands(state: any) {
    const brands = state.productList.map((item: any) => item.brand);
    return getFilterArray(brands);
  }
};
const mutations = {
  //解决方案：加上state参数
  clearCart(state) {
    state.cartList = [];
  }
};
```

3. setup中无法直接使用this Vue实例对象

   > Vue3中新加组合式API setup.
>
   > * 区别于选项API：`data`、`computed`、`methods`、`watch`等，开发者需要关注多个接口实现.
   >
   > * 运行在beforeCreate和created之前，替代这两个生命周期
   > * 在执行 setup 时尚未创建组件实例，因此在 setup 选项中没有 this。
   > * setup接收prop参数，即除了 props 之外，你将无法访问组件中声明的任何属性——本地状态、计算属性或方法。

   ```typescript
   //解决方案：使用useStore方法
   import { useStore } from "vuex";
   const store = useStore();
   ```

​     
