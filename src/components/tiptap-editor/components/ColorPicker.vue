<script setup lang="ts">
import { ref } from 'vue';
import { getIcon } from '../utils';
import { COLORS_LIST } from '../constants/define';

interface Props {
  modelValue?: string;
}

interface Emits {
  (event: 'update:modelValue', color: string): void;
  (event: 'change', color: string): void;
}

withDefaults(defineProps<Props>(), {
  modelValue: ''
});

const emit = defineEmits<Emits>();

const menu = ref(false);

function setColor(color: string) {
  emit('update:modelValue', color);
  emit('change', color);
  menu.value = false;
}
</script>

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    activator="parent"
  >
    <v-list>
      <v-sheet class="d-flex flex-wrap justify-between ma-1" fluid :max-width="230">
        <v-btn
          v-for="color in COLORS_LIST"
          :key="color"
          flat
          icon
          density="compact"
          @click="setColor(color)"
        >
          <v-icon :icon="getIcon('circle')" :color="color" />
        </v-btn>
      </v-sheet>
    </v-list>
  </v-menu>
</template>
