import AbstractView from './abstract.js';

const createTripInfoTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class TripInfo extends AbstractView {
  getTemplate() {
    return createTripInfoTemplate();
  }
}
