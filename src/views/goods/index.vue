<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[0].id">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/' + goods.categories[1].id">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 名字区组件 -->
          <GoodsName :goods="goods" />
          <!-- 规格组件 -->
          <GoodsSku :goods="goods" skuId="300334891" @change="changeSku" />
          <!-- 数量组件 -->
          <XtxNumbox v-model="num" :max="goods.inventory" />
          <XtxButton @click="insertCart" type="primary" style="margin-top: 20px"
            >加入购物车</XtxButton
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn'
import { nextTick, ref, watch, provide } from 'vue'
import { useStore } from 'vuex'
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router'
import Message from '@/components/library/Message'

// 获取商品详情
// 出现路由地址商品ID发生变化，但是不会重新初始化组件
const goods = ref(null)
const route = useRoute()
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then((data) => {
        // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  },
  { immediate: true }
)

const changeSku = (sku) => {
  if (sku.skuId) {
    goods.value.price = sku.price
    goods.value.oldPrice = sku.oldPrice
    goods.value.inventory = sku.inventory
    currSku.value = sku
  } else {
    currSku.value = null
  }
}

const num = ref(1)
provide('goods', goods)

// 加入购物车逻辑
const currSku = ref(null)
const store = useStore()
const insertCart = () => {
  if (!currSku.value) {
    return Message({ type: 'warn', text: '请选择商品规格' })
  }
  if (num.value > goods.value.inventory) {
    return Message({ type: 'warn', text: '库存不足' })
  }
  store
    .dispatch('cart/insertCart', {
      id: goods.value.id,
      skuId: currSku.value.skuId,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: currSku.value.price,
      nowPrice: currSku.value.price,
      count: num.value,
      attrsText: currSku.value.specsText,
      selected: true,
      isEffective: true,
      stock: currSku.value.inventory
    })
    .then(() => {
      Message({ text: '加入购物车成功', type: 'success' })
    })
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
