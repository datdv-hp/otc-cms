<script lang="ts" setup>
import Avatar from '@/assets/images/avatar.png';
import { PageName } from '@/common/constants/common.constant';
import { logout } from '@/plugins/axios';

const { t } = useI18n();
const router = useRouter();
const menuItems = computed(() => {
  return [
    {
      title: t('auth.accountMenu.signOut'),
      prependIcon: '$common.logout',
      onClick: () => {
        logout();
      }
    },
    {
      title: t('auth.accountMenu.profile'),
      prependIcon: '$common.laugh',
      onClick: () => {
        router.push({ name: PageName.PROFILE_PAGE });
      }
    }
  ];
});
const selected = shallowRef();
</script>
<template>
  <v-menu elevation="2">
    <template #activator="{ props }">
      <v-img
        v-bind="props"
        class="me-6 cursor-pointer"
        :src="Avatar"
        :height="36"
        :width="36"
      ></v-img>
    </template>
    <v-list v-model="selected" density="compact">
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :title="item.title"
        :prepend-icon="item.prependIcon"
        @click="item.onClick"
      >
      </v-list-item>
      {{ selected }}
    </v-list>
  </v-menu>
</template>
<style lang="scss" scoped></style>
