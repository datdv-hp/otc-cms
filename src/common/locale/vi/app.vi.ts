import { SupportLanguage } from '@/common/constants/common.constant';

export default {
  sidebar: {
    home: {
      name: 'Trang chủ'
    },
    management: {
      name: 'Quản lý',
      user: {
        name: 'Người dùng'
      },
      admin: {
        name: 'Quản trị viên'
      }
    },
    setting: {
      name: 'Cài đặt',
      cashback: {
        name: 'Hoàn tiền'
      },
      award: {
        name: 'Mốc thưởng'
      },
      system: {
        name: 'Hệ thống'
      }
    }
  },
  theme: {
    dark: 'Tối',
    light: 'Sáng'
  },
  lang: {
    [SupportLanguage.EN]: 'Tiếng Anh',
    [SupportLanguage.VI]: 'Tiếng Việt'
  }
};
