import icons from './constants/icons';
import { IconOptions } from './types';

export const getIcon = (iconKey?: IconOptions) => {
  if (!iconKey) {
    return undefined;
  }
  return icons[iconKey];
};
