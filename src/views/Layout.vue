<template>
  <AppTopnav />
  <AppHeader />
  <AppHeaderSticky />
  <main class="app-body">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script setup>
import { useStore } from 'vuex'
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky.vue'

const store = useStore()
store.dispatch('category/getList')
</script>

<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
