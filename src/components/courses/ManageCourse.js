import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData'
import Spinner from '../common/Spinner';

function ManageCourse({
  authors,
  courses,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setError] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {

    if (courses.length === 0) {
      loadCourses().catch(error => {
        console.log('loading courses failed. ' + error);
      });
    } else {
      setCourse({ ...props.course })
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        console.log('loading authors failed. ' + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required';
    if (!authorId) errors.author = 'Author is required';
    if (!category) errors.category = 'Category is required';

    setError(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true)
    saveCourse(course).then(() => {
      toast.success('Course saved');
      history.push('/courses')
    }).catch(error => {
      setSaving(false);
      setError({ onSave: error.message })
    });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
      <CourseForm
        onChange={handleChange}
        course={course}
        authors={authors}
        errors={errors}
        saving={saving}
        onSave={handleSave} />
    );
}

ManageCourse.propTypes = {
  course: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
}

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;

  return {
    course,
    authors: state.authors,
    courses: state.authors.length === 0 ? [] : state.courses.map(course => {
      return {
        ...course,
        authorName: state.authors.find(a => a.id === course.authorId).name
      }
    }),
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);

