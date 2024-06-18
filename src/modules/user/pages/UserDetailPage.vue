<script lang="ts" setup>
import UserDetailGeneralSection from '@/modules/user/components/UserDetailGeneralSection.vue';
import UserDetailF1Section from '@/modules/user/components/UserDetailF1Section.vue';
</script>
<template>
  <div class="user-detail__wrapper">
    <UserDetailGeneralSection />
    <UserDetailF1Section class="mt-6" />
  </div>
</template>
<style lang="scss" scoped>
.detail__wrapper {
}
</style>
