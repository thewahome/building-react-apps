import { CREATE_COURSE_SUCCESS, LOAD_COURSES_SUCCESS, UPDATE_COURSE_SUCCESS } from '../constants';
import * as courseApi from '../../api/courseApi';

export function loadCoursesSuccess(courses){
    return { type: LOAD_COURSES_SUCCESS , courses };
}

export function saveCourseSuccess(course){
    return { type: CREATE_COURSE_SUCCESS , course };
}
export function updateCourseSuccess(course){
    return { type: UPDATE_COURSE_SUCCESS , course };
}

export function loadCourses(){
    return function(dispatch){
        return courseApi.getCourses().then((courses)=>{
            dispatch(loadCoursesSuccess(courses));
        })
        .catch((error)=>{
            throw error;
        })
    }
}

export function saveCourse (course) {
    return function(dispatch){
        return courseApi.saveCourse(course)
        .then((savedCourse) => {
            course.id ?
            dispatch(saveCourseSuccess(savedCourse)) :
            dispatch(updateCourseSuccess(savedCourse));
        })
        .catch((error)=>{
            throw error;
        })
    }
}