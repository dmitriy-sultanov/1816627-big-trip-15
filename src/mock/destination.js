import { CITIES, SENTENCES } from '../data.js';
import { getPicturesArray } from '../view/utils/points.js';
import { getRandomArrayElement } from '../view/utils/common.js';
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
