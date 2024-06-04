import type { FunctionalComponent, SVGAttributes } from 'vue';

export function flattenIconsObject(
  obj: Record<string, any>
): Record<string, FunctionalComponent<SVGAttributes>> {
  const result: Record<string, FunctionalComponent<SVGAttributes>> = {};
  function recurse(obj: Record<string, any>, currentKey: string) {
    for (const key in obj) {
      const value = obj[key];
      const newKey = currentKey ? `${currentKey}.${key}` : key;
      if (typeof value === 'object' && !('render' in value)) {
        recurse(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  }
  recurse(obj, '');
  return result;
}
