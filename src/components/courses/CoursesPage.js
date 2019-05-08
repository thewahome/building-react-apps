import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from './CourseList';

class CoursesPage extends React.Component {

  componentDidMount () {
    const { actions, authors, courses } = this.props;

    if (courses.length === 0 ) {
      actions.loadCourses().catch(error=>{
        console.log('loading courses failed. '+ error);
      });
    }

    if (authors.length === 0 ) {
      actions.loadAuthors().catch(error=>{
        console.log('loading authors failed. '+ error);
      });
    }
  }
  render () {
    return (
      <>
        <h3>Courses</h3>
        <CourseList courses={this.props.courses}/>
      </>
      );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    authors: state.authors,
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
    actions:{
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
