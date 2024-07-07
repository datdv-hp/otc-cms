import appEn from '@/common/locale/en/app.en';
import commonEn from '@/common/locale/en/common.en';
import appVi from '@/common/locale/vi/app.vi';
import commonVi from '@/common/locale/vi/common.vi';
import adminEn from '@/modules/admin/locale/en/admin.en';
import adminVi from '@/modules/admin/locale/vi/admin.vi';
import authEn from '@/modules/auth/locale/en/auth.en';
import authVi from '@/modules/auth/locale/vi/auth.vi';
import settingEn from '@/modules/setting/locale/en/setting.en';
import settingVi from '@/modules/setting/locale/vi/setting.vi';
import userEn from '@/modules/user/locale/en/user.en';
import userVi from '@/modules/user/locale/vi/user.vi';
import fieldsEn from '../yup/locale/en/fields.en';
import yupEn from '../yup/locale/en/yup.en';
import fieldsVi from '../yup/locale/vi/fields.vi';
import yupVi from '../yup/locale/vi/yup.vi';
import { tiptapEditorLocale } from '@/components/tiptap-editor/locale';

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
    tiptapEditor: tiptapEditorLocale.en
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
    tiptapEditor: tiptapEditorLocale.vi
  }
};
export default messages;
