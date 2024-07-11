<script lang="ts" setup>
import { fileToBase64, toPixel } from '@/common/helper';
import { useFileDialog } from '@vueuse/core';
import { VImg } from 'vuetify/components/VImg';

type Props = {
  height?: number | string;
  width?: number | string;
  cover?: boolean;
  aspectRatio?: string;
  chooseText?: string;
  accept?: string;
  errorMessage?: string;
};
const { t } = useI18n();
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '200%',
  cover: true,
  accept: '*'
});
const accept = computed(() => props.accept);
const imgSrc = defineModel<string | null>();
const { onChange, open: openChooseIconFileDialog, reset } = useFileDialog({ accept: accept.value });

onChange((files) => {
  fileToBase64(files?.[0]).then((src) => {
    imgSrc.value = src;
  });
});
function clearImage() {
  reset();
  imgSrc.value = null;
}
defineOptions({
  inheritAttrs: false
});
onUnmounted(() => {
  reset();
});
</script>
<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <div v-bind="props" class="image-upload__wrapper" :class="{ isHovering }">
        <div v-if="imgSrc && isHovering" class="hovering-toolbar">
          <div class="icon-group">
            <v-btn
              variant="plain"
              density="compact"
              color="neutral"
              icon="$common.cloud-upload"
              @click.stop="openChooseIconFileDialog"
            ></v-btn>
            <v-btn
              variant="plain"
              density="compact"
              color="neutral"
              icon="$common.close-circled"
              @click="clearImage"
            ></v-btn>
          </div>
        </div>
        <v-img
          v-if="imgSrc"
          class="image"
          @click.stop="openChooseIconFileDialog"
          :src="imgSrc"
          :width="width"
          :height="height"
          :cover="cover"
          :aspect-ratio="aspectRatio"
        ></v-img>
        <div
          v-else
          class="no-image"
          :style="{
            width: toPixel(width),
            height: toPixel(height)
          }"
        >
          <v-btn
            class="text-none"
            size="small"
            variant="outlined"
            color="secondary"
            @click.stop="openChooseIconFileDialog"
          >
            {{ chooseText || t('common.button.chooseImage') }}
          </v-btn>
        </div>
      </div>
      <div v-if="!!errorMessage" class="error-message">{{ errorMessage }}</div>
    </template>
  </v-hover>
</template>
<style lang="scss" scoped>
.error-message {
  margin-inline-start: 8px;
  color: $color-primary-3;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
}
.image-upload__wrapper {
  position: relative;
  .no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed rgb(133, 133, 133);
    border-radius: 4px;
  }
  .image {
    border: 1px solid rgb(var(--v-theme-border));
  }
  .image,
  .no-image {
    border-radius: 4px;
    transition: border-color 0.15s linear;
  }
  &.isHovering {
    .no-image,
    .image {
      border-color: rgb(var(--v-theme-on-surface));
    }
  }
  .hovering-toolbar {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: rgba(var(--v-theme-surface), 0.1);

    .icon-group {
      display: flex;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 24px;
      background-color: rgba(var(--v-theme-surface), 0.4);
      backdrop-filter: blur(1px);
    }
  }
}
</style>
