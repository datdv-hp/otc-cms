<script lang="ts" setup>
import { PageName } from '@/common/constants/common.constant';
import { logout } from '@/plugins/axios';

type Props = {
  avatarSize?: string;
};
withDefaults(defineProps<Props>(), {
  avatarSize: '36px'
});
const { t } = useI18n();
const router = useRouter();
const menuItems = computed(() => {
  return [
    {
      title: t('auth.accountMenu.profile'),
      prependIcon: '$common.laugh',
      onClick: () => {
        router.push({ name: PageName.PROFILE_PAGE });
      }
    },
    {
      title: t('auth.accountMenu.signOut'),
      prependIcon: '$common.logout',
      onClick: () => {
        logout();
      }
    }
  ];
});
const selected = shallowRef();
</script>
<template>
  <v-menu elevation="2">
    <template #activator="{ props }">
      <DefaultAvatar v-bind="props" class="cursor-pointer" :style="{ fontSize: avatarSize }" />
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
