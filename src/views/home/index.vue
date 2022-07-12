<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>
  </div>
  <!-- 新鲜好物 -->
</template>

<script setup>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner.vue'
</script>

<style scoped lang="less">
.container {
  .hoverShadow();
  color: @xtxColor;
}
</style>
