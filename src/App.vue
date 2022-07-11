<template>
  <div class="container">
    APP
    {{ $store.state.user.profile.account }}
    <button @click="$store.commit('user/setUser', { account: 'zhousg' })">
      设置用户信息
    </button>
  </div>
</template>
<script setup></script>
