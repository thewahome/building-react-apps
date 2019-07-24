import * as courseActions from '../../redux/actions/courseActions';
import courseReducer from "../../redux/reducers/courseReducer";

describe('create course', () => {
  it('should add a course when passed CREATE_COURSE_SUCCESS action', () => {
    //arrange
    const initialState = [
      { title: 'A' },
      { title: 'B' }
    ];
    const newCourse = {
      title: 'C'
    };
    const action = courseActions.createCourseSuccess(newCourse);

    //act
    const newState = courseReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  })


  it('should update a course when passed UPDATE_COURSE_SUCCESS action', () => {
    //arrange
    const initialState = [
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
      { id: 3, title: 'C' }
    ];

    const updatedCourse = {
      id: 3, title: 'New update'
    };
    const action = courseActions.updateCourseSuccess(updatedCourse);

    //act
    const newState = courseReducer(initialState, action);
    const original = initialState.find(course => course.id === updatedCourse.id);

    //assert
    expect(newState.length).toEqual(3);
    expect(newState[2].title).toEqual('New update');
    expect(newState[2].title).not.toEqual(original.title);
  })
})
