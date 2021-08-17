import { getTotalCost, startEventDay, endEventDay, getRoute, createElement } from '../util.js';

const createTripInfoTemplate = (waypoints) => `<section class="trip-main__trip-info  trip-info">
   <div class="trip-info__main">
     <h1 class="trip-info__title">${getRoute(waypoints)}</h1>
     <p class="trip-info__dates">${startEventDay(waypoints[0].dateFrom)}&nbsp;&mdash;&nbsp;${endEventDay(waypoints[waypoints.length -1].dateTo)}</p>
   </div>
   <p class="trip-info__cost">
     Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalCost(waypoints)}</span>
   </p>
 </section>`;

export default class TripInfo {
  constructor(waypoints) {
    this._waypoints = waypoints;
    this._element = null;
  }

  getTempate() {
    return createTripInfoTemplate(this._waypoints);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTempate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
