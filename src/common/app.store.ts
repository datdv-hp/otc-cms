import { useDisplay } from 'vuetify';
import { MIN_DISPLAY_WIDTH } from './constants/common.constant';

export const UseAppStore = defineStore('app', () => {
  const { width } = useDisplay();
  const isShowSidebar = shallowRef(false);

  function setIsShowSidebar(value: boolean) {
    isShowSidebar.value = value;
  }
  const isTemporarySidebar = computed(() => {
    return width.value < 700;
  });
  const isMinDisplayWidth = computed(() => width.value < MIN_DISPLAY_WIDTH);

  return {
    isShowSidebar,
    setIsShowSidebar,
    isTemporarySidebar,
    isMinDisplayWidth
  };
});
