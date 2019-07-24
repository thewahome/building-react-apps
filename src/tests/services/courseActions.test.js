import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import * as courseActions from '../../redux/actions/courseActions';
import * as types from '../../redux/constants';
import { courses } from '../../../tools/mockData';

//test an async function
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('load courses thunk', () => {
    it('should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses', () => {
      fetchMock.mock('*', {
        body: courses,
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses },
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
    })
  })

})


describe('create course success', () => {
  it('should create CREATE_COURSE_SUCCESS action', () => {
    //arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };

    //act
    const action = courseActions.createCourseSuccess(course);

    //assert
    expect(action).toEqual(expectedAction);
  })
})
