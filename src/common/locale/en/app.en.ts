import { SupportLanguage } from '@/common/constants/common.constant';

export default {
  sidebar: {
    home: {
      name: 'Dashboard'
    },
    user: {
      name: 'User'
    },
    admin: {
      name: 'Admin'
    },
    setting: {
      name: 'Setting',
      cashback: {
        name: 'Cashback'
      },
      award: {
        name: 'Award'
      }
    }
  },
  theme: {
    dark: 'Dark',
    light: 'Light'
  },
  lang: {
    [SupportLanguage.EN]: 'English',
    [SupportLanguage.VI]: 'Vietnamese'
  }
};
