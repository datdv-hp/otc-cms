<script lang="ts" setup>
import LogoImage from '@/assets/images/logo.png';
import { UseAppStore } from '@/common/app.store';
import { PageName } from '@/common/constants/common.constant';
import { ISidebarItem } from '@/layouts/type';
import { useDisplay } from 'vuetify';

const { t } = useI18n();
const { smAndUp } = useDisplay();
const appStore = UseAppStore();

const isOpen = computed({
  get: () => appStore.isShowSidebar,
  set: (value: boolean) => {
    appStore.setIsShowSidebar(value);
  }
});

const sidebar = computed<ISidebarItem[]>(() => {
  return [
    {
      title: t('app.sidebar.home.name'),
      icon: '$sidebar.home',
      activeIcon: '$sidebar.home-solid',
      routeName: PageName.HOME_PAGE,
      activeRouteNames: [PageName.HOME_PAGE],
      role: true
    },
    {
      title: t('app.sidebar.user.name'),
      icon: '$sidebar.user',
      activeIcon: '$sidebar.user-solid',
      routeName: PageName.USER_LIST_PAGE,
      activeRouteNames: [PageName.USER_LIST_PAGE, PageName.USER_DETAIL_PAGE],
      role: true
    },
    {
      title: t('app.sidebar.admin.name'),
      icon: '$sidebar.admin',
      activeIcon: '$sidebar.admin-solid',
      routeName: PageName.ADMIN_LIST_PAGE,
      role: true
    },
    {
      title: t('app.sidebar.setting.name'),
      icon: '$sidebar.setting',
      activeIcon: '$sidebar.setting-solid',
      role: true,
      subItems: [
        {
          title: t('app.sidebar.setting.cashback.name'),
          routeName: PageName.SETTING_CASHBACK_PAGE,
          icon: '$sidebar.cashback',
          activeIcon: '$sidebar.cashback-solid',
          role: true
        },
        {
          title: t('app.sidebar.setting.award.name'),
          routeName: PageName.SETTING_AWARD_PAGE,
          icon: '$sidebar.award',
          activeIcon: '$sidebar.award-solid',
          role: true
        }
      ]
    }
  ].filter((item) => item.role);
});

function hideSidebar() {
  isOpen.value = false;
}

onMounted(() => {
  if (smAndUp.value) {
    isOpen.value = true;
  } else {
    isOpen.value = false;
  }
});
</script>
<template>
  <v-navigation-drawer
    v-model="isOpen"
    class="px-1 py-0"
    :temporary="!smAndUp"
    :permanent="smAndUp"
    width="280"
    :scrim="false"
    flat
  >
    <div class="logo-wrapper">
      <v-img :src="LogoImage"></v-img>
      <span class="logo-text">OTC</span>
      <v-spacer />
      <v-icon icon="$common.close" @click="hideSidebar"></v-icon>
    </div>
    <v-list class="sidebar-content" nav density="comfortable">
      <template v-for="(item, _) in sidebar" :key="_">
        <template v-if="item.subItems?.length">
          <v-list-subheader :title="item.title" v-if="item.title" />
          <v-list-item
            v-for="(subItem, subIndex) in item.subItems"
            :key="subIndex"
            :to="{ name: subItem.routeName }"
            :title="subItem.title"
          >
            <template #prepend="{ isActive }">
              <v-icon :icon="isActive ? subItem.activeIcon : subItem.icon" />
            </template>
            <template #title="{ title }">
              <span class="tp-base-1-sb">{{ title }}</span>
            </template>
          </v-list-item>
        </template>
        <v-list-item v-else class="tp-base-1-sb" :title="item.title" :to="{ name: item.routeName }">
          <template #prepend="{ isActive }">
            <v-icon :icon="isActive ? item.activeIcon : item.icon" />
          </template>
          <template #title="{ title }">
            <span class="tp-base-1-sb">{{ title }}</span>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<style lang="scss" scoped>
.logo-wrapper {
  padding: 6px 16px 48px 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  .logo-text {
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 0.25em;
  }
}
</style>
