import { ToastType, useToasts } from '@/components/toast/store';
import dayjs from '@/plugins/dayjs';
import i18n from '@/plugins/vue-i18n';
import { Dayjs } from 'dayjs';
import { DATE_TIME_FORMAT } from './constants/common.constant';

export function isValidJSON(str: string) {
  try {
    const object = JSON.parse(str);
    if (object && typeof object === 'object') return true;
    return false;
  } catch (error) {
    return false;
  }
}

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
  try {
    JSON.stringify(obj);
  } catch (e) {
    return false;
  }
  return true;
}

export function translateYupError(
  yupError?: { i18nKey: string; params?: Record<string, string> } | string
): string {
  // @ts-ignore
  const t = i18n.global.t;
  const te = i18n.global.te;
  if (!yupError) return '';
  if (typeof yupError === 'string') {
    return te(yupError) ? t(yupError) : yupError;
  }
  if (!yupError?.i18nKey) return '';
  return t(yupError?.i18nKey, { ...(yupError?.params || {}) });
}

export function notifyError(message: string, title?: string, duration = 2) {
  if (!message) return;
  const { appendToast } = useToasts();
  appendToast({ message, type: ToastType.ERROR, title: title || '', duration });
}

export function notifySuccess(message: string, title?: string, duration = 2) {
  if (!message) return;
  const { appendToast } = useToasts();
  appendToast({ message, type: ToastType.SUCCESS, title: title || '', duration });
}

export function notifyInfo(message: string, title?: string, duration = 2) {
  if (!message) return;
  const { appendToast } = useToasts();
  appendToast({ message, type: ToastType.INFO, title: title || '', duration });
}

export function NotifyWarning(message: string, title?: string, duration = 2) {
  if (!message) return;
  const { appendToast } = useToasts();
  appendToast({ message, type: ToastType.WARNING, title: title || '', duration });
}

export function formatDate(
  value: Date | string | Dayjs,
  format: DATE_TIME_FORMAT = DATE_TIME_FORMAT.YYYYMMDDHHmmss_HYPHEN
) {
  return dayjs(value).format(format);
}

export function formatCurrenCy(value: number, params?: { lang?: string; currency?: string }) {
  const { lang = navigator.languages?.[0] || 'en-US', currency = 'SOL' } = params || {};
  return Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
}

export function fileToBase64(file?: File | null): Promise<string | null> {
  return new Promise((resolve) => {
    if (!file) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      resolve(null);
    };
  });
}

export const toPixel = (value: number | string) => (Number.isNaN(value) ? value : `${value}px`);
