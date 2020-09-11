import React, { useState, useEffect } from "react";
import "./App.css";

import { Container, Row, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Posts(props) {
  const orderArray = [null, "asc", "desc"];
  const [currentOrderColumn, setCurrentOrderColumn] = useState(null);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

  const tableHeaders = [
    { label: "User Id", key: "userId", onClick: () => sortBy("userId") },
    { label: "Post Id", key: "id", onClick: () => sortBy("id") },
    { label: "Title", key: "title", onClick: () => sortBy("title") },
  ];

  function sortBy(sortByColumn) {
    if (currentOrderColumn === sortByColumn) {
      if (currentOrderIndex === orderArray.length - 1) {
        setCurrentOrderIndex(0);
      } else {
        setCurrentOrderIndex(currentOrderIndex + 1);
      }
    } else {
      setCurrentOrderColumn(sortByColumn);

      setCurrentOrderIndex(1);
    }
    props.getPosts(currentOrderColumn, currentOrderIndex);
  }

  if (props.error) {
    return <div>Error: {props.error.message}</div>;
  }
  if (props.loadingPosts) {
    return <div>LOADING</div>;
  }

  return (
    <Container>
      <Row className="mt-4 mb-4 text-right">
        <Link to="/create">
          <Button variant="warning">Create new Post</Button>
        </Link>
      </Row>
      <Row>
        <Table className="mt-5">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header.key}>
                  <button onClick={header.onClick}>
                    {header.label}--
                    {header.key === currentOrderColumn
                      ? orderArray[currentOrderIndex]
                      : ""}
                  </button>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.posts.map((post) => (
              <tr>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  <div>
                    <Link to={`/details/${post.id}`}>
                      <Button variant="info" className="mr-3">
                        Details
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => props.handleDelete(post.id)}
                    >
                      {post.isLoadingDelete ? "Loading" : "Delete"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default Posts;
