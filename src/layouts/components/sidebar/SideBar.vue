<script lang="ts" setup>
import MiniLogoLight from '@/assets/images/mini-logo-light.svg?component';
import MiniLogoDark from '@/assets/images/mini-logo-dark.svg?component';
import { PageName, SupportTheme } from '@/common/constants/common.constant';
import { ISidebarItem } from '@/layouts/type';
import { useTheme } from 'vuetify';

const { t } = useI18n();
const theme = useTheme();
const themeName = computed(() => theme.global.name.value);
const themeComputed = computed<SupportTheme>({
  get: () => theme.name.value as SupportTheme,
  set: (value: SupportTheme) => {
    return (theme.global.name.value = value);
  }
});
const Logo = computed(() => {
  return themeName.value === 'dark' ? MiniLogoDark : MiniLogoLight;
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
      activeRouteNames: [PageName.ADMIN_LIST_PAGE],
      role: true
    },
    {
      title: t('app.sidebar.setting.name'),
      icon: '$sidebar.setting',
      activeIcon: '$sidebar.setting-solid',
      routeName: PageName.SETTING_CASHBACK_PAGE,
      activeRouteNames: [PageName.SETTING_CASHBACK_PAGE],
      role: true
    }
  ].filter((item) => item.role);
});
function toggleTheme() {
  theme.global.name.value = themeName.value === 'dark' ? 'light' : 'dark';
}
</script>
<template>
  <v-navigation-drawer
    :theme="themeName"
    class="px-6 py-4"
    permanent
    floating
    width="340"
    :scrim="false"
  >
    <div class="logo-wrapper">
      <component :is="Logo" />
      <span class="logo-text">OTC</span>
    </div>
    <v-list class="sidebar-content" nav>
      <template v-for="(item, _) in sidebar" :key="_">
        <v-list-group class="sidebar-item" v-if="item.subItems?.length">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :title="item.title">
              <template #prepend="{ isActive }">
                <v-icon :icon="isActive ? item.activeIcon : item.icon"></v-icon> </template
            ></v-list-item>
          </template>
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
        </v-list-group>
        <v-list-item
          v-else
          class="sidebar-item tp-base-1-sb"
          :title="item.title"
          :to="{ name: item.routeName }"
        >
          <template #prepend="{ isActive }">
            <v-icon :icon="isActive ? item.activeIcon : item.icon" />
          </template>
          <template #title="{ title }">
            <span class="tp-base-1-sb">{{ title }}</span>
          </template>
        </v-list-item>
      </template>
    </v-list>
    <v-btn-toggle
      class="toggle-theme"
      v-model="themeComputed"
      rounded="xl"
      :mandatory="true"
      density="comfortable"
    >
      <v-btn
        class="light text-none"
        rounded="xl"
        :value="SupportTheme.LIGHT"
        prepend-icon="$sidebar.light-mode"
      >
        <span class="tp-base-1-sb">
          {{ t('app.theme.light') }}
        </span>
      </v-btn>
      <v-btn
        class="dark text-none"
        rounded="xl"
        :value="SupportTheme.DARK"
        prepend-icon="$sidebar.dark-mode"
      >
        <span class="tp-base-1-sb">{{ t('app.theme.dark') }}</span>
      </v-btn>
    </v-btn-toggle>
  </v-navigation-drawer>
</template>
<style lang="scss" scoped>
:deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
  .logo-wrapper {
    padding-bottom: 48px;
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
  .sidebar-content {
    flex: 1;
    padding: 0;
  }
}

:deep(.v-list-item) {
  &.sidebar-item {
    padding: 12px;
    margin-bottom: 8px !important;
    width: 292px;
    border-radius: 12px;
    grid-template-columns: 36px 1fr auto;
  }

  .v-list-item__overlay {
    opacity: 0;
  }
  .v-list-item__prepend {
    .v-icon {
      opacity: 1;
    }
  }
  &:hover {
  }
}

.toggle-theme {
  padding: 4px;
  gap: 4px;
  .v-btn {
    flex: 1;
    transition: all 0.3s linear;
  }
}

.v-theme--light {
  &.v-list-item {
    &.v-list-item--active {
      box-shadow:
        0px 1px 1px 0px #ffffff inset,
        0px -2px 1px 0px #0000000d inset;
      background-color: $color-neutral-3;
    }
  }
  &.toggle-theme {
    background-color: $color-neutral-2;
    .light {
      box-shadow:
        0px 4px 8px -4px #00000040,
        0px 2px 0px 0px #ffffff40 inset,
        0px -1px 1px 0px #0000000a inset;
    }
    .dark {
      background-color: inherit;
      color: $color-neutral-4;
      &:hover {
        color: $color-neutral-8;
      }
    }
  }
}

.v-theme--dark {
  &.v-list-item {
    &.v-list-item--active {
      box-shadow:
        0px 1px 1px 0px #ffffff1c inset,
        0px -2px 1px 0px #00000066 inset;
      background-color: $color-neutral-6;
    }
  }

  &.toggle-theme {
    background-color: $color-neutral-8;
    .light {
      background-color: inherit;
      color: $color-neutral-4;
      &:hover {
        color: $color-neutral-2;
      }
    }
    .dark {
      box-shadow:
        0px 4px 8px -4px #00000040,
        0px 2px 1px 0px #ffffff0f inset,
        0px -1px 1px 0px #0000007d inset;
    }
  }
}
</style>
