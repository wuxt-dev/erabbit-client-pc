<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <div ref="target" style="position: relative; height: 406px">
        <Transition name="fade">
          <!-- 面板内容 -->
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img v-lazy="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import HomePanel from './home-panel'
import { findNew } from '@/api/home'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hooks'

const target = ref(null)
const goods = useLazyData(target, findNew)
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
