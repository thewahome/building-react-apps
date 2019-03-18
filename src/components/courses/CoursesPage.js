import React from "react";

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
    debugger
    alert(this.state.course.title)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Courses</h3>
        <h4>Add Course</h4>
        <input type='text' onChange={this.handleChange} value={this.state.course.title} />
        <input type='submit' value='Save'/>
      </form>
      );
  }
}

export default CoursesPage;
