import { AccountStatus } from '../../constant';

export default {
  title: {
    list: 'Danh sách quản trị viên',
    create: 'Tạo mới quản trị viên',
    update: 'Chỉnh sửa quản trị viên'
  },
  fields: {
    id: 'ID',
    fullname: 'Tên người dùng',
    username: 'Tên đăng nhập',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    createdAt: 'Ngày tạo',
    status: 'Trạng thái',
    actions: 'Hành động'
  },
  status: {
    [AccountStatus.ACTIVE]: 'Đang hoạt động',
    [AccountStatus.INACTIVE]: 'Dừng hoạt động'
  }
};
