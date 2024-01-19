<template>
  <div :style="componentStyle" class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';

const data = reactive({
  positionX: 100,
  positionY: 100,
});

// 定义css供template调用
const componentStyle = computed(() => ({
  position: 'absolute',
  left: `${data.positionX}px`,
  top: `${data.positionY}px`,
}));


// 定义可供其他组件调用的方法, defineExpose在最后
const myMethod = () => {
  console.log('这是一个可供其他组件调用的方法');
};


const moveStep = (deltaX, deltaY) => {
  let setupx = (deltaX === undefined) ? 10 : deltaX;
  let setupy = (deltaY === undefined) ? 10 : deltaY;

  data.positionX += setupx; // 或者任何你想要的改变位置的逻辑
  data.positionY += setupy;
};

defineExpose({
  myMethod,
  moveStep,
});

</script>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
