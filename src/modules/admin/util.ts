import dayjs from '@/plugins/dayjs';

export function randomDate(max: Date, offsetDays: number) {
  return dayjs(max)
    .subtract(offsetDays, 'day')
    .add(Math.floor(Math.random() * offsetDays), 'day')
    .toDate();
}
