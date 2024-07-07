<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { useElementBounding } from '@vueuse/core';
import { computed, ref, unref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ButtonViewReturn } from './types';
import ActionButton from './components/ActionButton.vue';

interface Menu {
  button: ButtonViewReturn;
  divider: boolean;
  spacer: boolean;
}

interface Props {
  editor: Editor;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
});

const { t } = useI18n();
const toolbarRef = ref();
const { width } = useElementBounding(toolbarRef);

const toolbar = computed(() => {
  const extensions = [...props.editor.extensionManager.extensions];
  const sortExtensions = extensions.sort((arr, acc) => {
    const a = arr.options.order ?? 9999;
    const b = acc.options.order ?? 9999;
    return a - b;
  });

  let menus: Menu[] = [];
  let subMenus: Menu[] = [];

  for (const extension of sortExtensions) {
    const { button, divider = false, spacer = false, showBreakpoint = 0 } = extension.options;
    if (!button || typeof button !== 'function') continue;
    const _button: ButtonViewReturn = button({
      editor: props.editor,
      extension,
      t: unref(t)
    });

    if (Array.isArray(_button)) {
      const menu: Menu[] = _button.map((k, i) => ({
        button: k,
        divider: i === _button.length - 1 ? divider : false,
        spacer: i === 0 ? spacer : false
      }));
      if (showBreakpoint > width.value) {
        subMenus = [...subMenus, ...menu];
      } else {
        menus = [...menus, ...menu];
      }
      continue;
    }
    if (showBreakpoint > width.value) {
      subMenus.push({ button: _button, divider, spacer });
    } else {
      menus.push({ button: _button, divider, spacer });
    }
  }

  return { mainItems: menus, subItems: subMenus };
});
</script>

<template>
  <v-toolbar
    v-bind="$attrs"
    density="compact"
    flat
    height="auto"
    class="py-1 ps-1"
    ref="toolbarRef"
  >
    <div ref="actions" class="d-flex" v-for="(item, index) in toolbar.mainItems" :key="index">
      <!-- Spacer -->
      <v-spacer :key="index" v-if="item.spacer" />
      <!-- Buttons -->
      <component
        :is="item.button.component"
        v-bind="item.button.componentProps"
        :editor="editor"
        :disabled="disabled"
      />
      <!-- Divider -->
      <v-divider :key="index" v-if="item.divider" vertical class="mx-1 me-2" />
    </div>
    <ActionButton icon="more" v-if="toolbar.subItems?.length">
      <v-menu
        activator="parent"
        content-class="d-flex flex-column gap--1 py-1"
        location="bottom right"
        offset="2"
      >
        <v-toolbar color="white" density="compact" flat height="auto" class="py-1 ps-1 box">
          <template v-for="(item, index) in toolbar.subItems" :key="index">
            <component
              :is="item.button.component"
              v-bind="item.button.componentProps"
              :editor="editor"
              :disabled="disabled"
            />
            <v-divider :key="index" v-if="item.divider" vertical class="mx-1 me-2" />
          </template>
        </v-toolbar>
      </v-menu>
    </ActionButton>
  </v-toolbar>
</template>
<style lang="scss" scoped>
:deep(.v-btn) {
  font-size: 12px;
}
</style>
