import {
  CREATE_EVENT,
  DELETE_ALL_EVENTS,
  DELETE_EVENT,
  REVERSE_DONE_FLAG,
} from "../actions/index";

import shortid from "shortid";

const events = (state = [], action) => {
  switch (action.type) {
    case CREATE_EVENT:
      const event = {
        title: action.title,
        body: action.body,
        isChecked: action.isChecked,
        count: action.count,
      };
      const id = shortid.generate();
      return [...state, { id, ...event }];

    case DELETE_EVENT:
      state.map((event) =>
        event.id !== action.id ? event.count : (event.count -= 1)
      );
      return state.filter((event) => event.id !== action.id); //()内に残って欲しいものをかく
    case DELETE_ALL_EVENTS:
      return [];

    case REVERSE_DONE_FLAG:
      state = state.map((event) => {
        return {
          ...event,
          isChecked:
            event.id === action.id ? !event.isChecked : event.isChecked,
        };
      });
      const checked = state.filter((event) => event.isChecked);
      state.map((event) => (event.count = checked.length));

      return state;
    default:
      return state;
  }
};

export default events;
