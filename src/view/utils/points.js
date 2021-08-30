import { SENTENCES, PICTURE_COUNT_MIN, PICTURE_COUNT_MAX, MIN_CITIES_LENGTH } from '../../data.js';
import { getRandomInteger, getRandomArrayElement } from './common.js';
import dayjs from 'dayjs';

const getPicturesArray = () => {
  const pictures = new Array;
  for(let i = 0; i < getRandomInteger(1, PICTURE_COUNT_MAX); i++) {
    const picture = {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(PICTURE_COUNT_MIN, PICTURE_COUNT_MAX)}`,
      description: getRandomArrayElement(SENTENCES),
    };
    pictures.push(picture);
  }
  return pictures;
};

const startEventDay = (dateFrom) => dayjs(dateFrom).format('MMMM D');
const endEventDay = (dateTo) => dayjs(dateTo).format('D MMMM');
const timeStart = (dateFrom) => dayjs(dateFrom).format('HH:mm');
const timeEnd = (dateTo) => dayjs(dateTo).format('HH:MM');
const eventStartTime = (dateFrom) => dayjs(dateFrom).format('DD/MM/YY HH:mm');
const eventEndTime = (dateTo) => dayjs(dateTo).format('DD/MM/YY HH:mm');

const getTotalCost = (points) =>{
  const totalCost = points.reduce((sum, point) => {
    const offersCost = point.offer.offers.reduce((cost, offer) => offer.price + cost, 0);
    return point.basePrice + offersCost + sum;
  }, 0);
  return totalCost;
};

const getRoute = (points) => {
  const cities = [...new Set(points.map((point) => point.destination.name))];
  const lastCity = cities.slice([cities.length -1]);

  if(cities.length > MIN_CITIES_LENGTH) {
    return `${cities.slice(0, 1).join(' &mdash; ')} &mdash; . . . &mdash; ${lastCity.join(' &mdash; ')}`;
  }
  return cities.join(' &mdash; ');
};

export {getPicturesArray, startEventDay, endEventDay, timeStart, timeEnd, eventStartTime, eventEndTime, getTotalCost, getRoute};
