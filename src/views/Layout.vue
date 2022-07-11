<template>
  <AppTopnav />
  <AppHeader />
  <header>header</header>
  <main class="app-body">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script setup>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer'
</script>

<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
