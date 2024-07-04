import { SystemSettingType } from '../../constant';

export default {
  breadcrumb: {
    cashback: 'Cài đặt hoàn tiền',
    award: 'Cài đặt mốc thưởng',
    system: 'Cài đặt hệ thống'
  },
  cashback: {
    title: {
      create: 'Tạo gói hoàn tiền',
      update: 'Cập nhật gói hoàn tiền'
    },
    fields: {
      id: 'ID',
      name: 'Tên gói hoàn tiền',
      percent: 'Giá trị hoàn (%)',
      createdAt: 'Ngày tạo',
      actions: 'Hành động'
    },
    placeholder: {
      name: 'Nhập tên gói hoàn tiền',
      percent: 'Nhập giá trị hoàn tiền'
    },
    success: {
      create: 'Tạo gói hoàn tiền thành công',
      update: 'Cập nhật gói hoàn tiền thành công',
      delete: 'Xóa gói hoàn tiền thành công'
    },
    error: {
      create: 'Tạo gói hoàn tiền không thành công',
      update: 'Cập nhật gói hoàn tiền không thành công',
      delete: 'Xóa gói hoàn tiền không thành công'
    },
    confirm: {
      delete: {
        title: 'Xác nhận xóa gói hoàn tiền',
        content:
          'Bạn có chắc chắn muốn xóa gói hoàn tiền <span class="confirm-delete-text-highlight">{cashback}</span> không?'
      }
    }
  },
  award: {
    title: {
      create: 'Tạo mốc thưởng',
      update: 'Cập nhật mốc thưởng'
    },
    fields: {
      id: 'ID',
      name: 'Tên mốc thưởng',
      stepValue: 'Mốc thưởng',
      icon: 'Ảnh minh họa',
      description: 'Mô tả',
      createdAt: 'Ngày tạo',
      actions: 'Hành động'
    },
    placeholder: {
      name: 'Nhập tên mốc thưởng',
      stepValue: 'Nhập giá trị mốc thưởng',
      description: 'Nhập mô tả'
    },
    success: {
      create: 'Tạo mốc thưởng thành công',
      update: 'Cập nhật mốc thưởng thành công',
      delete: 'Xóa mốc thưởng thành công'
    },
    error: {
      create: 'Tạo mốc thưởng không thành công',
      update: 'Cập nhật mốc thưởng không thành công',
      delete: 'Xóa mốc thưởng không thành công'
    },
    confirm: {
      delete: {
        title: 'Xác nhận xóa mốc thưởng',
        content:
          'Bạn có chắc chắn muốn xóa mốc thưởng <span class="confirm-delete-text-highlight">{award}</span> không?'
      }
    }
  },
  system: {
    title: {
      create: 'Tạo cấu hình hệ thống',
      update: 'Cập nhật cấu hình hệ thống'
    },
    fields: {
      id: 'ID',
      type: 'Loại dữ liệu',
      label: 'Nhãn',
      key: 'Khóa',
      value: 'Giá trị',
      createdAt: 'Ngày tạo',
      actions: 'Hành động'
    },
    placeholder: {
      type: 'Chọn loại dữ liệu',
      label: 'Nhập nhãn',
      key: 'Nhập khóa',
      value: 'Nhập giá trị'
    },
    success: {
      update: 'Cập nhật cấu hình hệ thống thành công'
    },
    error: {
      update: 'Cập nhật cấu hình hệ thống không thành công'
    },
    settingType: {
      [SystemSettingType.BOOLEAN]: 'Boolean',
      [SystemSettingType.DATE]: 'Date',
      [SystemSettingType.FILE]: 'File',
      [SystemSettingType.NUMBER]: 'Number',
      [SystemSettingType.RICHTEXT]: 'Richtext',
      [SystemSettingType.TEXT]: 'Text',
      [SystemSettingType.TEXTAREA]: 'Textarea'
    }
  }
};
