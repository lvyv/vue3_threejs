<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue';
import WelcomeItem from './WelcomeItem.vue';
import DocumentationIcon from './icons/IconDocumentation.vue';
import ToolingIcon from './icons/IconTooling.vue';
import EcosystemIcon from './icons/IconEcosystem.vue';
import CommunityIcon from './icons/IconCommunity.vue';
import SupportIcon from './icons/IconSupport.vue';
import mitt from 'mitt';

// 定义接收的 props
const props = defineProps(/* ... */);

// 定义触发的事件
// const emit = defineEmits();
const emits = defineEmits(['minimize']);

// 定义方法
const minimize = () => {
  console.log('minimize button is pressed.')
  emits('minimize');
};
const moveStep = () => {
  welcomeItem.value.moveStep();
  welcomeItem2.value.myMethod();
  window.EventBus_.emit('TOPIC', { x: 3, y: 3 });
};
// 定义子组件
const welcomeItem = ref();
const welcomeItem2 = ref();

const evt_handler = (type, e) => {
  // console.log(type);
  console.log(`receive message, mx: ${e.mouseX}, my: ${e.mouseY}`);
  let deltaX = parseInt(e.mouseX * 100);
  let deltaY = parseInt(e.mouseY * 100);
  welcomeItem.value.moveStep(deltaX, deltaY);
}
// 定义只在组件初始化时执行的代码
onMounted(() => {
  // 在这里执行初始化代码，例如获取初始数据等
  window.EventBus_.on('*', evt_handler);
});
// 取消事件订阅
onUnmounted(() => {
  // 在这里执行销毁代码，取消消息订阅等
  window.EventBus_.off('*', evt_handler);
});

</script>

<template>
  <button @click="minimize">Minimize</button>
  <button @click="moveStep">moving</button>

  <WelcomeItem ref="welcomeItem">
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>
  <WelcomeItem ref="welcomeItem2">
  </WelcomeItem>
</template>
