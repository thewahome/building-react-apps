import * as courseActions from '../../redux/actions/courseActions';
import * as types from '../../redux/constants';
import { courses } from '../../../tools/mockData';

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
