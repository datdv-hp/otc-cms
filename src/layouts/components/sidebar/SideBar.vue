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
      title: t('app.sidebar.management.name'),
      role: true,
      subItems: [
        {
          title: t('app.sidebar.management.user.name'),
          icon: '$sidebar.user',
          activeIcon: '$sidebar.user-solid',
          routeName: PageName.USER_LIST_PAGE,
          role: true
        },
        {
          title: t('app.sidebar.management.admin.name'),
          icon: '$sidebar.admin',
          activeIcon: '$sidebar.admin-solid',
          routeName: PageName.ADMIN_LIST_PAGE,
          role: true
        }
      ]
    },
    {
      title: t('app.sidebar.setting.name'),
      role: true,
      subItems: [
        {
          title: t('app.sidebar.setting.cashback.name'),
          routeName: PageName.CASHBACK_SETTING_PAGE,
          icon: '$sidebar.cashback',
          activeIcon: '$sidebar.cashback-solid',
          role: true
        },
        {
          title: t('app.sidebar.setting.award.name'),
          routeName: PageName.AWARD_SETTING_PAGE,
          icon: '$sidebar.award',
          activeIcon: '$sidebar.award-solid',
          role: true
        },
        {
          title: t('app.sidebar.setting.system.name'),
          routeName: PageName.SYSTEM_SETTING_PAGE,
          icon: '$sidebar.setting',
          activeIcon: '$sidebar.setting-solid',
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
    class="pa-0"
    :temporary="!smAndUp"
    :permanent="smAndUp"
    width="280"
    :scrim="false"
    flat
  >
    <div class="logo-wrapper">
      <img :src="LogoImage" width="44" height="44" />
      <span class="logo-text">OTC</span>
      <v-spacer />
      <v-icon icon="$common.close" @click="hideSidebar"></v-icon>
    </div>
    <v-list class="pa-0" nav>
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
              <span class="title-text">{{ title }}</span>
            </template>
          </v-list-item>
        </template>
        <v-list-item v-else class="title-text" :title="item.title" :to="{ name: item.routeName }">
          <template #prepend="{ isActive }">
            <v-icon :icon="isActive ? item.activeIcon : item.icon" />
          </template>
          <template #title="{ title }">
            <span class="title-text">{{ title }}</span>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<style lang="scss" scoped>
.logo-wrapper {
  padding: 20px 16px 20px 32px;
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

:deep(.v-list-subheader) {
  padding-inline-start: 32px !important;
  margin-top: 12px;
}

:deep(.v-list-item) {
  color: $color-neutral-3 !important;
  padding-inline-start: 30px;
  .v-list-item-title .title-text {
    font-size: 15px;
    font-weight: 500 !important;
  }

  &.v-list-item--active {
    position: relative;
    background-color: $color-neutral-8;
    color: $color-neutral-0 !important;
    .v-list-item-title .title-text {
      font-weight: 600 !important;
    }
    > ::before {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      width: 2px;
      height: 100%;
      border-radius: 0 4px 4px 0;
      background-color: rgb(var(--v-theme-primary));
      transition: l3 0.3s;
    }
  }
}

@keyframes l3 {
  20% {
    background-position:
      0% 0%,
      50% 50%,
      100% 50%;
  }
}
</style>
