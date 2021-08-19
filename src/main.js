import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/trip-info.js';
import FilterView from './view/filters.js';
import TripSortingView from './view/trip-sorting.js';
import EditTripPointView from './view/edit-point.js';
import TripPointView from './view/trip-point.js';
import EventListView from './view/trip-events-list.js';
import NoEventView from './view/no-event.js';
import { getPoint } from './mock/point.js';
import { render, RenderPosition } from './util.js';


const WAYPOINT_COUNT = 15;

const waypoints = new Array(WAYPOINT_COUNT).fill().map(getPoint).sort((a, b) => a.dateFrom - b.dateFrom);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripFiltersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new EventListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

const renderPointList = (container, points) => {
  if(points.length === 0) {
    render(container, new NoEventView().getElement(), RenderPosition.BEFOREEND);
  }
  render(tripMainElement, new TripInfoView(waypoints).getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new TripSortingView().getElement(), RenderPosition.AFTERBEGIN);
  points.forEach((waypoint) => {
    const tripPointViewElement = new TripPointView(waypoint).getElement();
    render(tripEventsListElement, tripPointViewElement, RenderPosition.BEFOREEND);
    const editTripPointViewElement = new EditTripPointView(waypoint).getElement();
    const editForm = editTripPointViewElement.querySelector('form');
    const rollUpButton = tripPointViewElement.querySelector('.event__rollup-btn');
    const closeButton  = editTripPointViewElement.querySelector('.event__rollup-btn');
    const replacePointToForm = () => {
      tripEventsListElement.replaceChild(editTripPointViewElement, tripPointViewElement);
    };

    const replaceFormToPoint = () => {
      tripEventsListElement.replaceChild(tripPointViewElement, editTripPointViewElement);
    };

    const onEscKeyDown = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    editForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    rollUpButton.addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    closeButton.addEventListener('click', () =>{
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  });
};

renderPointList(tripEventsElement, waypoints);
