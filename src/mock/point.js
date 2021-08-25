import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { getDestinations } from './destination.js';
import { getMainOffer } from './offers.js';
import { MAX_DAY_GAP, MAX_HOUR_GAP, MAX_MIN_GAP,  MSEC_IN_HOUR, MSEC_IN_DAY, POINT_TYPES, OFFER_TITLES, MAX_ID_NUMBER, PRICE_MIN, PRICE_MAX } from '../data.js';
import { getRandomArrayElement, getRandomInteger } from '../view/utils.js/common.js';

dayjs.extend(duration);
dayjs.duration(100);

const getDateFrom = () => {
  const addDays = getRandomInteger(1, MAX_DAY_GAP);
  const addHour = getRandomInteger(0, MAX_HOUR_GAP);
  const addMinute = getRandomInteger(0, MAX_MIN_GAP);
  return dayjs()
    .add(addDays, 'day')
    .hour(addHour)
    .minute(addMinute)
    .toDate();
};


const getDateTo = (date) => {
  const dayAdd = getRandomInteger(0, MAX_DAY_GAP);
  const hourAdd = getRandomInteger(0, MAX_HOUR_GAP);
  const minuteAdd = getRandomInteger(0, MAX_MIN_GAP);
  return dayjs(date)
    .add(dayAdd, 'day')
    .add(hourAdd, 'hour')
    .add(minuteAdd, 'minute');
};


const getDurationDate = (dateFrom, dateTo) => {
  const diffInMsec = dayjs(dateTo).diff(dayjs(dateFrom));

  const diff = {
    days: String(dayjs.duration(diffInMsec).days()).padStart(2, '0'),
    hours: String(dayjs.duration(diffInMsec).hours()).padStart(2, '0'),
    minutes: String(dayjs.duration(diffInMsec).minutes()).padStart(2, '0'),
  };
  if(diffInMsec < MSEC_IN_HOUR) {
    return `${diff.minutes}M`;
  }
  if(diffInMsec < MSEC_IN_DAY) {
    return `${diff.hours}H  ${diff.minutes}M`;
  }

  return `${diff.days}D ${diff.hours}H ${diff.minutes}M`;
};


const getPoint = () => {
  const dateFrom = getDateFrom();
  const dateTo = getDateTo(dateFrom);
  const durationTime = getDurationDate(dateFrom, dateTo);
  const typePoint = POINT_TYPES[getRandomInteger(0, POINT_TYPES.length - 1)];
  const offer = getMainOffer(typePoint, OFFER_TITLES);

  return {
    type: typePoint,
    basePrice: getRandomInteger(PRICE_MIN, PRICE_MAX),
    id: getRandomInteger(1, MAX_ID_NUMBER),
    dateFrom,
    dateTo,
    durationTime,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    destination: getRandomArrayElement(getDestinations()),
    offer,
  };
};


export {getPoint};
