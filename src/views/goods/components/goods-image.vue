<template>
  <div class="goods-image">
    <div
      v-show="show"
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, bgPosition]"
    ></div>
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <div class="layer" :style="position"></div>
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, defineProps, reactive, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
defineProps({
  images: {
    type: Array,
    default: () => []
  }
})
const currIndex = ref(0)

const target = ref(null)
const show = ref(false)
// elementX 鼠标基于容器左上角X轴偏移
// elementY 鼠标基于容器左上角Y轴偏移
// isOutside 鼠标是否在模板容器外
const { elementX, elementY, isOutside } = useMouseInElement(target)
const position = reactive({ left: 0, top: 0 })
const bgPosition = reactive({
  backgroundPositionX: 0,
  backgroundPositionY: 0
})
watch([elementX, elementY, isOutside], () => {
  // 控制X轴方向的定位 0-200 之间
  if (elementX.value < 100) position.left = 0
  else if (elementX.value > 300) position.left = 200
  else position.left = elementX.value - 100
  // 控制Y轴方向的定位 0-200 之间
  if (elementY.value < 100) position.top = 0
  else if (elementY.value > 300) position.top = 200
  else position.top = elementY.value - 100
  // 设置大背景的定位
  bgPosition.backgroundPositionX = -position.left * 2 + 'px'
  bgPosition.backgroundPositionY = -position.top * 2 + 'px'
  // 设置遮罩容器的定位
  position.left = position.left + 'px'
  position.top = position.top + 'px'
  // 设置是否显示预览大图
  show.value = !isOutside.value
})
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
