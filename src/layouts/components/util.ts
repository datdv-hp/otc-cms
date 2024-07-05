import { PageName } from '@/common/constants/common.constant';
import { ISidebarItem } from '../type';

export function initSidebar() {
  const { t } = useI18n();
  return computed<ISidebarItem[]>(() => {
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
}

export function initMobileBottomBar() {
  const { t } = useI18n();
  return computed<ISidebarItem[]>(() => {
    return [
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
      },

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
    ].filter((item) => item.role);
  });
}
