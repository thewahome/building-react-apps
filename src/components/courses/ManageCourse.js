import React from "react";
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from "prop-types";

class ManageCourse extends React.Component {
  componentDidMount () {
    const { authors, courses, loadAuthors, loadCourses } = this.props;

    if (courses.length === 0 ) {
      loadCourses().catch(error=>{
        console.log('loading courses failed. '+ error);
      });
    }

    if (authors.length === 0 ) {
      loadAuthors().catch(error=>{
        console.log('loading authors failed. '+ error);
      });
    }
  }

  render () {
    return (
    <>
    <h4>Manage Course</h4>
    </>
);
  }
}

ManageCourse.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);

