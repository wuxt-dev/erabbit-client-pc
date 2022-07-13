<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a href="javascript:;" v-for="prop in item.properties" :key="prop.id">{{
          prop.name
        }}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script setup>
import { findSubCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
// 1. 获取数据
// 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
// 3. 完成渲染
const route = useRoute()
const filterData = ref(null)
const filterLoading = ref(false)
// 4. 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && route.path === '/category/sub/' + newVal) {
      filterLoading.value = true
      findSubCategoryFilter(route.params.id).then((data) => {
        data.result.brands.unshift({ id: null, name: '全部' })
        data.result.saleProperties.forEach((item) => {
          item.properties.unshift({ id: null, name: '全部' })
        })
        filterData.value = data.result
        filterLoading.value = data.false
      })
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
