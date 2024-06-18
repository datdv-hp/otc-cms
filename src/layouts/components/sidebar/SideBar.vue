<script lang="ts" setup>
import MiniLogoDark from '@/assets/images/mini-logo-dark.svg?component';
import MiniLogoLight from '@/assets/images/mini-logo-light.svg?component';
import { PageName, SupportTheme } from '@/common/constants/common.constant';
import { ISidebarItem } from '@/layouts/type';
import { useTheme } from 'vuetify';

const { t } = useI18n();
const theme = useTheme();

const Logo = computed(() => {
  return theme.name.value === SupportTheme.DARK ? MiniLogoDark : MiniLogoLight;
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
      icon: '$sidebar.user',
      activeIcon: '$sidebar.user-solid',
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
          activeRouteNames: [PageName.SETTING_CASHBACK_PAGE],
          role: true
        },
        {
          title: t('app.sidebar.setting.encourageTrading.name'),
          routeName: PageName.SETTING_ENCOURAGE_TRADING_PAGE,
          activeRouteNames: [PageName.SETTING_ENCOURAGE_TRADING_PAGE],
          role: true
        }
      ]
    }
  ].filter((item) => item.role);
});
</script>
<template>
  <v-navigation-drawer class="px-1 py-0" permanent width="280" :scrim="false">
    <div class="logo-wrapper">
      <component :is="Logo" />
      <span class="logo-text">OTC</span>
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
  padding: 16px 0 48px 10px;
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
