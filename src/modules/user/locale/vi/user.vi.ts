import { UserStatus } from '../../constant';

export default {
  title: {
    list: 'Danh sách người dùng'
  },
  breadcrumb: {
    list: 'Danh sách người dùng',
    detail: 'Chi tiết người dùng'
  },
  fields: {
    index: 'STT',
    telegramUsername: 'Người dùng (Telegram)',
    transactionToday: 'Khối lượng giao dịch trong ngày',
    lastTransactionAt: 'Giao dịch lần cuối',
    lastClaimAt: 'Nhận thưởng lần cuối',
    status: 'Trạng thái',
    actions: 'Hành động',
    f1Count: 'Số lượng F1',
    referralId: 'Người giới thiệu',
    tip: 'Tip',
    tipSnip: 'Tip snip',
    slippage: 'Slippage',
    slippageSnip: 'Slippage snip',
    buyCustom: 'Buy custom',
    sellCustom: 'Sell custom',
    antimev: 'Antimev'
  },
  status: {
    [UserStatus.ACTIVE]: 'Đang hoạt động',
    [UserStatus.INACTIVE]: 'Ngừng hoạt động'
  },
  action: {
    deactivate: 'Vô hiệu hóa',
    activate: 'Kích hoạt',
    tradingDetail: 'Chi tiết giao dịch',
    cashbackConfiguration: 'Cấu hình hoàn tiền'
  },
  section: {
    generalTitle: 'Thông tin chung',
    f1Title: 'Thông tin F1'
  },
  tooltip: {
    detail: 'Chi tiết',
    ban: 'Vô hiệu hóa',
    unban: 'Kích hoạt',
    configCashback: 'Cấu hình hoàn tiền'
  },
  success: {
    ban: 'Vô hiệu hóa người dùng thành công',
    unban: 'Kích hoạt người dùng thành công'
  },
  error: {
    ban: 'Vô hiệu hóa người dùng không thành công',
    unban: 'Kích hoạt người dùng không thành công'
  }
};
