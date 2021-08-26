import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/trip-info.js';
import FilterView from './view/filters.js';
import TripSortingView from './view/trip-sorting.js';
import EditTripPointView from './view/edit-point.js';
import TripPointView from './view/trip-point.js';
import EventListView from './view/trip-events-list.js';
import NoEventView from './view/no-event.js';
import { getPoint } from './mock/point.js';
import { render, RenderPosition, replace } from './view/utils/render.js';

const WAYPOINT_COUNT = 15;

const waypoints = new Array(WAYPOINT_COUNT).fill().map(getPoint).sort((a, b) => a.dateFrom - b.dateFrom);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripFiltersElement, new FilterView(), RenderPosition.BEFOREEND);
render(tripEventsElement, new EventListView(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

const renderPoints = (points) => {
  render(tripMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new TripSortingView(), RenderPosition.AFTERBEGIN);
  points.forEach((waypoint) => {
    const tripPointView = new TripPointView(waypoint);
    render(tripEventsListElement, tripPointView, RenderPosition.BEFOREEND);
    const editTripPointView = new EditTripPointView(waypoint);

    const onEscKeyDown = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replace(tripPointView, editTripPointView);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    editTripPointView.setSubmitHandler(() => {
      replace(tripPointView, editTripPointView);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    tripPointView.setEditClickHandler(() =>{
      replace(editTripPointView, tripPointView);
      document.addEventListener('keydown', onEscKeyDown);
    });

    editTripPointView.setCloseFormHandler(() =>{
      replace(tripPointView, editTripPointView);
      document.removeEventListener('keydown', onEscKeyDown);
    });
  });
};

const renderPointList = (container, points) => {
  if(points.length === 0) {
    render(container, new NoEventView(), RenderPosition.BEFOREEND);
    return;
  }
  renderPoints(points);
};

renderPointList(tripEventsElement, waypoints);
