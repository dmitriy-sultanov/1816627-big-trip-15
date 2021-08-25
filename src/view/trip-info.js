import { getTotalCost, startEventDay, endEventDay, getRoute} from './utils.js/points.js';
import AbstractView from './abstract.js';

const createTripInfoTemplate = (waypoints) => `<section class="trip-main__trip-info  trip-info">
   <div class="trip-info__main">
     <h1 class="trip-info__title">${getRoute(waypoints)}</h1>
     <p class="trip-info__dates">${startEventDay(waypoints[0].dateFrom)}&nbsp;&mdash;&nbsp;${endEventDay(waypoints[waypoints.length -1].dateTo)}</p>
   </div>
   <p class="trip-info__cost">
     Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalCost(waypoints)}</span>
   </p>
 </section>`;

export default class TripInfo extends AbstractView {
  constructor(waypoints) {
    super();
    this._waypoints = waypoints;
  }

  getTemplate() {
    return createTripInfoTemplate(this._waypoints);
  }
}
