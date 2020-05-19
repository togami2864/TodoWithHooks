import {
    CREATE_EVENT,
    DELETE_ALL_EVENTS,
    DELETE_EVENT,
    REVERSE_DONE_FLAG
} from '../actions/index'





const events = (state = [], action) => {

    switch (action.type) {
        case CREATE_EVENT:
            const event = { title: action.title, body: action.body, isChecked: action.isChecked, count: action.count };
            const length = state.length;
            const id = length === 0 ? 1 : state[length - 1].id + 1;
            return [...state, { id, ...event }]

        case DELETE_EVENT:
            return state.filter(event => event.id !== action.id)//()内に残って欲しいものをかく
        case DELETE_ALL_EVENTS:
            return []

        case REVERSE_DONE_FLAG:
            state[action.id - 1].isChecked = !action.isChecked
            const checked = state.filter((event) => event.isChecked);
            state.map((event) => event.count = checked.length);
            return state
        default:
            return state
    }
}

export default events