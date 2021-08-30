import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/trip-info.js';
import FilterView from './view/filters.js';
import { getPoint } from './mock/point.js';
import { render, RenderPosition } from './view/utils/render.js';
import EventsPresenter from './presenter/events.js';

const WAYPOINT_COUNT = 15;

const waypoints = new Array(WAYPOINT_COUNT).fill().map(getPoint).sort((a, b) => a.dateFrom - b.dateFrom);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const tripEventsElement = siteMainElement.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter(tripEventsElement);

render(tripMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripFiltersElement, new FilterView(), RenderPosition.BEFOREEND);

if(waypoints.length !== 0) {
  render(tripMainElement, new TripInfoView(waypoints), RenderPosition.AFTERBEGIN);
}

eventsPresenter.init(waypoints);
