<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div v-if="!goods" class="loading"></div>
      <GoodsSku
        v-if="goods"
        :skuId="skuId"
        :goods="goods"
        @change="changeSku"
      />
      <XtxButton
        v-if="goods"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        @click="submit"
        >确认</XtxButton
      >
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getSpecsAndSkus } from '@/api/product'
import GoodsSku from '@/views/goods/components/goods-sku.vue'

const props = defineProps({
  attrsText: {
    type: String,
    default: ''
  },
  skuId: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['change'])

const visible = ref(false)
const goods = ref(null)
const show = () => {
  visible.value = true
  // 获取当前spec和sku数据
  getSpecsAndSkus(props.skuId).then((data) => {
    goods.value = data.result
  })
}
const hide = () => {
  visible.value = false
  goods.value = null
}
const toggle = () => {
  visible.value ? hide() : show()
}
const target = ref(null)
onClickOutside(target, () => {
  hide()
})

// 选择SKU时候触发
const currSku = ref(null)
const changeSku = (sku) => {
  currSku.value = sku
}
// 点击确认的时候，提交sku信息给购物车组件
const submit = () => {
  // 给购物车组件数据的前提：有sku信息，sku信息完整，sku中的skuId不能现有props.skuId一样
  if (
    currSku.value &&
    currSku.value.skuId &&
    currSku.value.skuId !== props.skuId
  ) {
    emits('change', currSku.value)
    hide()
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
