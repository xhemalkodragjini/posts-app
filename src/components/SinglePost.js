import React, { useLayoutEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./SinglePost.css";
import PostForm from "./PostForm";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [error, setError] = useState();
  const [editing, setEditing] = useState(false);

  const history = useHistory();
  //loaders
  //success, post n state
  useLayoutEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => setPost(json))
      .catch((err) => {
        setLoading(false);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleEdit() {
    setEditing(true);
  }

  function handleSubmitEdit(post) {
    setFormLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
        setEditing(false);
      })
      .catch((err) => setError(err))
      .finally(() => setFormLoading(false));
  }

  function handleCancel() {
    history.goBack();
    setEditing(false);
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <div>LOADING...</div>;
  }

  return (
    <Container className="container-details text-center">
      {editing ? (
        <PostForm
          handleSubmit={handleSubmitEdit}
          isLoading={formLoading}
          initialValues={{
            id: post.id,
            userId: post.userId,
            title: post.title,
            body: post.body,
          }}
          status="edit"
          handleCancel={handleCancel}
        />
      ) : (
        <>
          <h1 className="mt-4 mb-5">Details</h1>
          <h3 className="post-title">TITLE: {post.title}</h3>
          <h3>USER ID: {post.userId}</h3>
          <h3 className="post-body">{post.body}</h3>
          <Button onClick={handleEdit}>Edit</Button>
        </>
      )}
    </Container>
  );
}
