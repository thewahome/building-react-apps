import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount() {
    const { actions, authors, courses } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        console.log('loading courses failed. ' + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        console.log('loading authors failed. ' + error);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  }
  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h3>Courses</h3>
        {this.props.loading ?
          <Spinner /> :
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-sm btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}> Add Course
            </button>
            <CourseList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
          </>
        }
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
    courses: state.authors.length === 0 ? [] : state.courses.map(course => {
      return {
        ...course,
        authorName: state.authors.find(a => a.id === course.authorId).name
      }
    }),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
