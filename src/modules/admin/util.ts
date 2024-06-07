import dayjs from '@/plugins/dayjs';
import { Dayjs } from 'dayjs';

export function randomDate(start?: Date | Dayjs | number, end?: Date | Dayjs | number) {
  start = dayjs(start).subtract(2, 'year');
  end = dayjs(end).add(2, 'year');
  const diff = end.diff(start, 'day');
  return dayjs(start.add(Math.floor(Math.random() * diff))).toDate();
}

export function formatDate(value: Date | string | Dayjs) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
}
