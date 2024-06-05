import type { FunctionalComponent, SVGAttributes } from 'vue';
import { flattenIconsObject } from '../utils';
import sidebarIcons from './sidebarIcons';
import commonIcons from './commonIcons';
/**
 * Eg: Using with vuetify:
 * ```
 * <v-button icon="$custom.filter"></v-button>
 * ```
 * NOTE: custom SVG icon must be remove "width" and "height" attributes, change "stroke" value to "currentColor"
 */
const icons = flattenIconsObject({
  sidebar: sidebarIcons,
  common: commonIcons
}) as Record<string, FunctionalComponent<SVGAttributes>>;
export default icons;
