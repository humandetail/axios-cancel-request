<template>
  <div>
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于我</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 16px 0;

  a {
    padding: 6px 16px;
    color: #0088ff;
    border-radius: 4px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #fff;
      background-color: #0088ff;
    }
  }
}
</style>
