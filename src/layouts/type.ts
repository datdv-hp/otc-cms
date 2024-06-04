import { PageName } from '@/common/constants/common.constant';
import { Ref } from 'vue';

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
