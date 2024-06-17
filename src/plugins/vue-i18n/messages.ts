import appEn from '@/common/locale/en/app.en';
import appVi from '@/common/locale/vi/app.vi';
import userEn from '@/modules/user/locale/en/user.en';
import userVi from '@/modules/user/locale/vi/user.vi';
import adminEn from '@/modules/admin/locale/en/admin.en';
import adminVi from '@/modules/admin/locale/vi/admin.vi';
import yupEn from '../yup/locale/en/yup.en';
import yupVi from '../yup/locale/vi/yup.vi';
import fieldsEn from '../yup/locale/en/fields.en';
import fieldsVi from '../yup/locale/vi/fields.vi';
import commonEn from '@/common/locale/en/common.en';
import commonVi from '@/common/locale/vi/common.vi';
import authEn from '@/modules/auth/locale/en/auth.en';
import authVi from '@/modules/auth/locale/vi/auth.vi';
import settingEn from '@/modules/setting/locale/en/setting.en';
import settingVi from '@/modules/setting/locale/vi/setting.vi';
import { en as vuetifyEn, vi as vuetifyVi } from 'vuetify/locale';

const messages = {
  en: {
    app: appEn,
    user: userEn,
    admin: adminEn,
    yup: yupEn,
    fields: fieldsEn,
    common: commonEn,
    auth: authEn,
    setting: settingEn,
    $vuetify: vuetifyEn
  },
  vi: {
    app: appVi,
    user: userVi,
    admin: adminVi,
    yup: yupVi,
    fields: fieldsVi,
    common: commonVi,
    auth: authVi,
    setting: settingVi,
    $vuetify: vuetifyVi
  }
};
export default messages;
