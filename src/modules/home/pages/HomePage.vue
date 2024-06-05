<script lang="ts" setup>
import Avatar from '@/assets/images/avatar.png';
</script>
<template>
  <div class="wrapper">
    <b-button>
      <template #default> Click me</template>
    </b-button>

    <!-- <v-img :src="Avatar"></v-img> -->
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  margin-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 100%;
}
</style>
