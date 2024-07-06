import { useDisplay } from 'vuetify';

export const UseAppStore = defineStore('app', () => {
  const { width } = useDisplay();
  const isShowSidebar = shallowRef(false);

  function setIsShowSidebar(value: boolean) {
    isShowSidebar.value = value;
  }
  const isTemporarySidebar = computed(() => {
    return width.value < 700;
  });
  return {
    isShowSidebar,
    setIsShowSidebar,
    isTemporarySidebar
  };
});
