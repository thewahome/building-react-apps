import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorList = ({ authors }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {authors.map(author => {
        return (
          <tr key={author.id}>
            <td>
              <a
                className="btn btn-light"
                href={"http://pluralsight.com/authors/" + author.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={"/author/" + author.slug}>{author.title}</Link>
            </td>
            <td>{author.authorName}</td>
            <td>{author.category}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired
};

export default AuthorList;
