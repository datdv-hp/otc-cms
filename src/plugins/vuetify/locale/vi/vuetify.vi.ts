import { vi as vuetifyVi } from 'vuetify/locale';
export const customVuetifyVi = {
  ...vuetifyVi,
  dataFooter: { ...vuetifyVi.dataFooter, itemsPerPageText: 'Hiển thị' }
};
