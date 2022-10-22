<script setup lang="ts"></script>

<template>
  <router-view :key="$route.fullPath"> </router-view>
</template>

<style lang="scss">
*,
** {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  /* CUSTOM STYLE */
  background: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.p-divider-dashed.p-divider-horizontal:before {
  border-top: 1px dashed #d9d9d9 !important;
}

.p-sidebar-content {
  height: 100%;
}
</style>
