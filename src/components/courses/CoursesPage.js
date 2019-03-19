import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from "prop-types";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: ''
    }
  };

  handleChange = event => {
    const course = {...this.state.course, title:event.target.value};
    console.log(course)
    this.setState({course});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(courseActions.createCourse(this.state.course))
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Courses</h3>
        <h4>Add Course</h4>
        <input type='text' onChange={this.handleChange} value={this.state.course.title} />
        <input type='submit' value='Save'/>
        {
          this.props.courses.map(course => (
            <div key={course.title}>{course.title}</div>
          ))
        }
      </form>
      );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createCourse: course => dispatch(courseActions.createCourse(course))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
