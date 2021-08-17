import { CITIES, SENTENCES } from '../data.js';
import {getPicturesArray, getRandomArrayElement} from '../util.js';

const getDestinations = () => {
  const destArr = new Array;
  for(const city of CITIES) {
    destArr.push({
      name: city,
      description: getRandomArrayElement(SENTENCES),
      pictures: getPicturesArray(),
    });
  }
  return destArr;
};

export {getDestinations};
