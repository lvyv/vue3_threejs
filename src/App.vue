<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { ref } from 'vue';

// 使用 ref 定义响应式变量
const isMinimized = ref(false);

// 点击按钮缩小组件
const minimizeDialog = () => {
  isMinimized.value = true;
};

// 点击图标恢复组件
const restoreDialog = () => {
  isMinimized.value = false;
};
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="你办到了!" />
    </div>
  </header>

  <main>

    <div v-if="!isMinimized">
      <TheWelcome @minimize="minimizeDialog" />
    </div>
    <div v-else>
      <div @click="restoreDialog">Icon</div>
    </div>

  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
