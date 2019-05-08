import React from "react";
import { connect } from 'react-redux';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import AuthorList from './AuthorList';

class AuthorsPage extends React.Component {

  componentDidMount () {
    this.props.actions.loadAuthors().catch(error=>{
      console.log('loading authors failed. '+ error);
    })
  }
  render () {
    return (
      <>
        <h3>Authors</h3>
        <AuthorList authors={this.props.authors}/>
      </>
      );
  }
}

AuthorsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    authors: state.authors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
