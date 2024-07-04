import { AccountStatus } from '../../constant';

export default {
  title: {
    create: 'Tạo mới quản trị viên',
    update: 'Chỉnh sửa quản trị viên'
  },
  breadcrumb: {
    list: 'Danh sách quản trị viên'
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
  placeholder: {
    fullname: 'Nguyen Van A',
    username: 'nguyenvana'
  },
  status: {
    [AccountStatus.ACTIVE]: 'Đang hoạt động',
    [AccountStatus.INACTIVE]: 'Dừng hoạt động'
  },
  success: {
    create: 'Tạo quản trị viên thành công',
    update: 'Cập nhật quản trị viên thành công',
    delete: 'Xóa quản trị viên thành công'
  },
  error: {
    create: 'Tạo quản trị viên không thành công',
    update: 'Cập nhật quản trị viên không thành công',
    delete: 'Xóa quản trị viên không thành công'
  },
  validate: {
    emptyPassword: 'Mật khẩu không được để trống',
    confirmPassword: 'Mật khẩu không trùng khớp',
    validUsername: 'Tên đăng nhập chỉ bao gồm chữ thường, in hoa, số hoăc ký tự -_.@'
  },
  confirm: {
    delete: {
      title: 'Xác nhận xóa quản trị viên',
      content:
        'Bạn có chắc chắn muốn xóa quản trị viên <span class="confirm-delete-text-highlight">{admin}</span> không?'
    }
  }
};
