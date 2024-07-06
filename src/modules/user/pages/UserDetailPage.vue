<script lang="ts" setup>
import UserDetailGeneralSection from '@/modules/user/components/UserDetailGeneralSection.vue';
import UserDetailF1Section from '@/modules/user/components/UserDetailF1Section.vue';
import UserRefundUpdateDialog from '../components/UserRefundUpdateDialog.vue';
import { UseUserStore } from '../store';

const store = UseUserStore();
</script>
<template>
  <div class="user-detail__wrapper">
    <UserDetailGeneralSection />
    <UserDetailF1Section class="mt-6" />
  </div>
  <UserRefundUpdateDialog v-if="store.refundDialog.isShow" />
</template>
<style lang="scss" scoped></style>
