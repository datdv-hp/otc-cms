export const UseAppStore = defineStore('app', () => {
  const isShowSidebar = shallowRef(false);

  function setIsShowSidebar(value: boolean) {
    isShowSidebar.value = value;
  }

  return {
    isShowSidebar,
    setIsShowSidebar
  };
});
