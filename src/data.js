const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const CITIES = [
  'London',
  'Kiev',
  'Moscow',
  'Rome',
  'Paris',
  'Minsk',
  'Havana',
  'New York',
  'Chamonix',
];

const SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

const OFFER_TITLES = [
  'Choose meal',
  'Upgrade to comfort class',
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
];

const PRICE_MIN = 10;
const PRICE_MAX = 1000;

const PICTURE_COUNT_MIN = 1;
const PICTURE_COUNT_MAX = 5;

const MAX_DAY_GAP = 7;
const MAX_HOUR_GAP = 23;
const MAX_MIN_GAP = 59;

const MSEC_IN_HOUR = 3600000;
const MSEC_IN_DAY = 86400000;

const MIN_CITIES_LENGTH = 3;

export { POINT_TYPES, CITIES, SENTENCES, PRICE_MIN, PRICE_MAX, OFFER_TITLES, PICTURE_COUNT_MIN, PICTURE_COUNT_MAX, MAX_DAY_GAP, MAX_HOUR_GAP, MAX_MIN_GAP, MSEC_IN_HOUR, MSEC_IN_DAY, MIN_CITIES_LENGTH };
