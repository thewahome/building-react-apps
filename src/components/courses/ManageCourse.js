import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class ManageCourse extends React.Component {
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

/*   handleChange = event => {
    const course = {...this.state.course, title:event.target.value};
    this.setState({course});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course)
  } */

  render () {
    return (
      /*       <form onSubmit={this.handleSubmit}>
      <h4>Add Course</h4>
      <input type='text' onChange={this.handleChange} value={this.state.course.title} />
      <input type='submit' value='Save'/>
      </form>
      */
    <>
    <h4>Manage Course</h4>
    </>
);
  }
}

ManageCourse.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);

