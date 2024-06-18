import { PageName } from '@/common/constants/common.constant';
import { Ref } from 'vue';
import { RouteLocationRaw } from 'vue-router';

export interface ISidebarItem {
  title: string;
  routeName?: PageName;
  activeRouteNames?: PageName[];
  icon?: string;
  activeIcon?: string;
  subItems?: ISidebarItem[];
  active?: Ref<boolean>;
  role?: boolean;
}

export interface ISidebarGroup {
  groupName?: string;
  items: ISidebarItem[];
  role?: boolean;
}

export type IBreadcrumb = {
  title: string;
  active?: boolean;
  disabled?: boolean;
  to?: RouteLocationRaw;
  color?: string;
  activeColor?: string;
};
