import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/trip-info.js';
import FilterView from './view/filters.js';
import SortingView from './view/trip-sorting.js';
import EditTripPointView from './view/edit-point.js';
import TripPointView from './view/trip-point.js';
import EventListView from './view/trip-events-list.js';
import { getPoint } from './mock/point.js';
import { render, RenderPosition, replaceComponent } from './util.js';

const WAYPOINT_COUNT = 15;

const waypoints = new Array(WAYPOINT_COUNT).fill().map(getPoint).sort((a, b) => a.dateFrom - b.dateFrom);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripMainElement, new TripInfoView(waypoints).getElement(), RenderPosition.AFTERBEGIN);
render(tripFiltersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new EventListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

waypoints.forEach((waypoint) => {
  const tripPointViewElement = new TripPointView(waypoint).getElement();
  render(tripEventsListElement, tripPointViewElement, RenderPosition.BEFOREEND);
  const editTripPointViewElement = new EditTripPointView(waypoint).getElement();
  const editForm = editTripPointViewElement.querySelector('form');
  const rollUpButton = tripPointViewElement.querySelector('.event__rollup-btn');
  editForm.addEventListener('submit', replaceComponent(tripEventsListElement, tripPointViewElement, editTripPointViewElement));
  rollUpButton.addEventListener('click', replaceComponent(tripEventsListElement, editTripPointViewElement, tripPointViewElement));
});
