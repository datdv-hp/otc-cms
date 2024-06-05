import { SupportLanguage } from '@/common/constants/common.constant';

const messages: { [key in string]: any } = {};
const langs = Object.values(SupportLanguage);
const localeFiles = import.meta.glob<Record<string, any>>(
  ['@/modules/**/locale/*/*.ts', '@/common/locale/*/*.ts', '@/plugins/yup/locale/*/*.ts'],
  { eager: true, import: 'default' }
);

/**
 * Convert locale file name to camelCase
 * if it is kebab-case or contain dot '.'
 *
 * Ex:
 * - abc-def.en.ts => abcDef
 * - abc.def.en.ts => abcDef
 *
 */
function camelCase(str: string) {
  return str
    ?.replace(new RegExp(String.raw`\.(${langs.join('|')})\.ts$`), '')
    ?.replace(/(\.|-)./g, (_match) => _match?.slice(-1)?.toUpperCase());
}

for (const path in localeFiles) {
  const paths = path.split('/');
  const length = paths.length;
  const lang = paths[length - 2];
  const module = paths[length - 4];
  const matchedName = camelCase(paths[length - 1]);
  if (lang) {
    messages[lang] ??= {};
    messages[lang][module] ??= {};
    if (module === matchedName) {
      Object.assign(messages[lang][module], localeFiles[path]);
      continue;
    }
    messages[lang][module][matchedName] ??= {};
    Object.assign(messages[lang][module][matchedName], localeFiles[path]);
  }
}
console.log('messages', messages);
export default messages;
