import { Editor } from '@tiptap/vue-3';
import { ShallowRef, computed } from 'vue';

export function useTipTapToolbar(editor: ShallowRef<Editor | undefined>) {
  const items = computed(() => [
    {
      icon: 'mdi-format-bold',
      click: () => editor.value?.chain()?.focus()?.toggleBold()?.run(),
      disabled: !editor.value?.can()?.chain()?.focus()?.toggleBold()?.run(),
      isActive: editor.value?.isActive('bold')
    },
    {
      icon: 'mdi-format-italic',
      click: () => editor.value?.chain()?.focus()?.toggleItalic()?.run(),
      disabled: !editor.value?.can()?.chain()?.focus()?.toggleItalic()?.run(),
      isActive: editor.value?.isActive('italic')
    },
    {
      icon: 'mdi-format-strikethrough',
      click: () => editor.value?.chain()?.focus()?.toggleStrike()?.run(),
      disabled: !editor.value?.can()?.chain()?.focus()?.toggleStrike()?.run(),
      isActive: editor.value?.isActive('strike')
    },
    {
      icon: 'mdi-xml',
      click: () => editor.value?.chain()?.focus()?.toggleCode()?.run(),
      disabled: !editor.value?.can()?.chain()?.focus()?.toggleCode()?.run(),
      isActive: editor.value?.isActive('code')
    },
    {
      icon: 'mdi-format-clear',
      click: () => editor.value?.chain()?.focus()?.unsetAllMarks()?.run()
    },
    {
      icon: 'mdi-format-header-1',
      click: () => editor.value?.chain()?.focus()?.toggleHeading({ level: 1 })?.run(),
      isActive: editor.value?.isActive('heading', { level: 1 })
    },
    {
      icon: 'mdi-format-header-2',
      click: () => editor.value?.chain()?.focus()?.toggleHeading({ level: 2 })?.run(),
      isActive: editor.value?.isActive('heading', { level: 2 })
    },
    {
      icon: 'mdi-format-header-3',
      click: () => editor.value?.chain()?.focus()?.toggleHeading({ level: 3 })?.run(),
      isActive: editor.value?.isActive('heading', { level: 3 })
    },
    {
      icon: 'mdi-format-header-4',
      click: () => editor.value?.chain()?.focus()?.toggleHeading({ level: 4 })?.run(),
      isActive: editor.value?.isActive('heading', { level: 4 })
    },
    {
      icon: 'mdi-format-header-5',
      click: () => editor.value?.chain()?.focus()?.toggleHeading({ level: 5 })?.run(),
      isActive: editor.value?.isActive('heading', { level: 5 })
    },
    {
      icon: 'mdi-format-header-6',
      click: () => editor.value?.chain()?.focus()?.toggleHeading({ level: 6 })?.run(),
      isActive: editor.value?.isActive('heading', { level: 6 })
    },
    {
      icon: 'mdi-format-list-bulleted',
      click: () => editor.value?.chain()?.focus()?.toggleBulletList()?.run(),
      isActive: editor.value?.isActive('bulletList')
    },
    {
      icon: 'mdi-format-list-numbered',
      click: () => editor.value?.chain()?.focus()?.toggleOrderedList()?.run(),
      isActive: editor.value?.isActive('orderedList')
    },
    {
      icon: 'mdi-code-json',
      click: () => editor.value?.chain()?.focus()?.toggleCodeBlock()?.run(),
      isActive: editor.value?.isActive('codeBlock')
    },
    {
      icon: 'mdi-format-quote-close',
      click: () => editor.value?.chain()?.focus()?.toggleBlockquote()?.run(),
      isActive: editor.value?.isActive('blockquote')
    },
    {
      icon: 'mdi-arrow-split-horizontal',
      click: () => editor.value?.chain()?.focus()?.setHorizontalRule()?.run()
    },
    {
      icon: 'mdi-arrow-left-bottom',
      click: () => editor.value?.chain()?.focus()?.setHardBreak()?.run()
    },
    {
      icon: 'mdi-format-align-left',
      click: () => editor.value?.chain()?.focus()?.setTextAlign('left')?.run(),
      isActive: editor.value?.isActive({ textAlign: 'left' })
    },
    {
      icon: 'mdi-format-align-center',
      click: () => editor.value?.chain()?.focus()?.setTextAlign('center')?.run(),
      isActive: editor.value?.isActive({ textAlign: 'center' })
    },
    {
      icon: 'mdi-format-align-right',
      click: () => editor.value?.chain()?.focus()?.setTextAlign('right')?.run(),
      isActive: editor.value?.isActive({ textAlign: 'right' })
    },
    {
      icon: 'mdi-format-align-justify',
      click: () => editor.value?.chain()?.focus()?.setTextAlign('justify')?.run(),
      isActive: editor.value?.isActive({ textAlign: 'justify' })
    },
    {
      icon: 'mdi-undo',
      click: () => editor.value?.chain()?.focus()?.undo()?.run(),
      disabled: !editor.value?.can()?.chain()?.focus()?.undo()?.run()
    },
    {
      icon: 'mdi-redo',
      click: () => editor.value?.chain()?.focus()?.redo()?.run(),
      disabled: !editor.value?.can()?.chain()?.focus()?.redo()?.run()
    }
  ]);

  const fontFamilies = [
    'Be Vietnam Pro',
    'Arial',
    'Inter',
    'Comic Sans MS, Comic Sans',
    'sans-serif',
    'Times New Roman',
    'Fira Sans',
    'serif'
  ];
  const fontSizes = [
    '8',
    '9',
    '10',
    '11',
    '12',
    '14',
    '16',
    '18',
    '24',
    '30',
    '36',
    '48',
    '60',
    '72',
    '96'
  ];
  return {
    items,
    fontFamilies,
    fontSizes
  };
}
