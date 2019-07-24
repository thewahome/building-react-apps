import React from 'react';
import renderer from 'react-test-renderer';

import CourseForm from '../components/courses/CourseForm';
import { courses, authors } from '../../tools/mockData';

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(<CourseForm
    onChange={jest.fn()}
    course={courses[0]}
    authors={authors}
    saving
    onSave={jest.fn()}
  />);

  expect(tree).toMatchSnapshot();
})

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(<CourseForm
    onChange={jest.fn()}
    course={courses[0]}
    authors={authors}
    saving={false}
    onSave={jest.fn()}
  />);

  expect(tree).toMatchSnapshot();
})