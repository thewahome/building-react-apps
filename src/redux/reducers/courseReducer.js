import * as types from '../constants';
export default function courseReducer(state = [], action){
    switch (action.type) {
        case types.CREATE_COURSE:
            return [...state, {...action.course}];
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        default:
            return state;
    }
}