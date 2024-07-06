<script lang="ts" setup>
import UserTransactionTable from '../components/UserTransactionTable.vue';
import { UseUserStore } from '../store';
const route = useRoute();
const userStore = UseUserStore();
onMounted(() => {
  if (!userStore.detail) {
    userStore.getDetail(+route.params.id as number);
  }
});
</script>
<template>
  <div>
    <div class="user mt-n4 mb-4" v-if="!!userStore.detail">
      <span>{{ userStore.detail?.telegramUsername }}</span>
    </div>
    <v-card class="card-wrapper pa-3" :elevation="0">
      <UserTransactionTable />
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.user {
  font-size: 1.8em;
  font-weight: 600;
}
</style>
