import {FilterType} from '../data.js';
import {isFutureDate, isPastDate} from './date.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo)),
};
