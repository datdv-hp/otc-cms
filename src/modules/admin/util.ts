import dayjs from '@/plugins/dayjs';
import { Dayjs } from 'dayjs';

export function randomDate(max: Date, offsetDays: number) {
  return dayjs(max)
    .subtract(offsetDays, 'day')
    .add(Math.floor(Math.random() * offsetDays), 'day')
    .toDate();
}

export function formatDate(value: Date | string | Dayjs) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
}
