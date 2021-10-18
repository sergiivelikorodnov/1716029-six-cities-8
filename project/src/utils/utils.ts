
import dayjs from 'dayjs';

export function getHumanDate(date: string): string {
  return dayjs(date).format('D MMMM YYYY');
}

export function getDateTime(date: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}
