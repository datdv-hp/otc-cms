const STORE_NAME = 'admin-store';
export const UseAdminStore = defineStore(STORE_NAME, () => {
  const isOpenFormPopup = ref(false);
  const selectedId = ref<number | string | undefined>(undefined);

  function setIsOpenFormPopup(value: boolean) {
    isOpenFormPopup.value = value;
  }
  function setSelectedId(id?: number | string) {
    selectedId.value = id;
  }
  return {
    isOpenFormPopup,
    setIsOpenFormPopup,
    selectedId,
    setSelectedId
  };
});
