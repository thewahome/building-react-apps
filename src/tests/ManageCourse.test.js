import React from 'react'
import { mount } from 'enzyme'

import { authors, newCourse, courses } from '../../tools/mockData';
import { ManageCourse } from '../components/courses/ManageCourse';

function render(args) {
  const defaultProps = {
    authors,
    courses,

    history: {},
    loadAuthors: jest.fn(),
    match: {},
    course: newCourse,
    loadCourses: jest.fn(),
    saveCourse: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return mount(<ManageCourse {...props} />)
}

it(" sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find('form').simulate('submit');
  const error = wrapper.find('.alert').first();
  expect(error.text()).toBe(' Title is required ');
})