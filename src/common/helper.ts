import { ToastType, useToasts } from '@/components/toast/store';
import i18n from '@/plugins/vue-i18n';

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
  if (!yupError) return '';
  if (typeof yupError === 'string') {
    return t(yupError);
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
