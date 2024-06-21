import { SupportLanguage } from '@/common/constants/common.constant';

export default {
  sidebar: {
    home: {
      name: 'Trang chủ'
    },
    user: {
      name: 'Người dùng'
    },
    admin: {
      name: 'Quản trị viên'
    },
    setting: {
      name: 'Cài đặt',
      cashback: {
        name: 'Hoàn tiền'
      },
      encourageTrading: {
        name: 'Mốc thưởng'
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
