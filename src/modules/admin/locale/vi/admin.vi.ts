import { AccountStatus } from '../../constant';

export default {
  title: {
    list: 'Danh sách quản trị viên'
  },
  fields: {
    id: 'ID',
    fullname: 'Tên người dùng',
    username: 'Tên đăng nhập',
    createdAt: 'Ngày tạo',
    status: 'Trạng thái',
    actions: 'Hành động'
  },
  status: {
    [AccountStatus.ACTIVE]: 'Đang hoạt động',
    [AccountStatus.INACTIVE]: 'Dừng hoạt động'
  }
};
