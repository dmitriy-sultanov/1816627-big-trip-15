import { SENTENCES, PICTURE_COUNT_MIN, PICTURE_COUNT_MAX, MIN_CITIES_LENGTH } from './data.js';
import dayjs from 'dayjs';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  switch(place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const replaceComponent = (parentElement, newChild, oldChild ) => (event) => {
  event.preventDefault();
  parentElement.replaceChild(newChild, oldChild);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const getRandomLengthArray = (array) => {
  const interimArray = new Array(...array);
  const randomLengthArray = interimArray.slice(0, getRandomInteger(1, array.length));
  return randomLengthArray;
};

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
    return `${cities.slice(0, 1).join(' &mdash; ')}&mdash; . . . &mdash; ${lastCity.join(' &mdash; ')}`;
  }
  return cities.join(' &mdash; ');
};


export { getRandomInteger, getRandomArrayElement, getPicturesArray, getRandomLengthArray, timeStart, timeEnd, eventEndTime,eventStartTime, getTotalCost, startEventDay, endEventDay, getRoute, RenderPosition, render, createElement, replaceComponent };
