import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { Button, Container, Form } from "react-bootstrap";

export default function PostsPage() {
  const [error, setError] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  // similar to componentDidMount
  useEffect(() => {
    getPosts();
  }, []);

  // getPosts will be called when the currentPage changes
  useEffect(() => {
    getPosts();
  }, [currentPage]);

  function getPosts(itemsPerPage = postsPerPage, qParam, order, sort) {
    let queryUrlParam;
    if (qParam) {
      queryUrlParam = `&q=${qParam}`;
    } else {
      queryUrlParam = searchQuery ? `&q=${searchQuery}` : "";
    }

    let orderParam;
    if (order & sort) {
      orderParam = `&_sort=${sort}&_order=${order}`;
    } else {
      orderParam = "";
    }

    fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${itemsPerPage}&_page=${currentPage}${queryUrlParam}${orderParam}`
    )
      .then((res) => res.json())
      .then((results) => {
        setPosts(results);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoadingPosts(false));
  }

  function isDeletingPost(id, loadingDel) {
    const newPosts = posts.map((p) => ({ ...p }));
    const index = posts.findIndex((post) => post.id === id);
    newPosts[index].isLoadingDelete = loadingDel;
    return newPosts;
  }

  function handleDelete(id) {
    setPosts(isDeletingPost(id, true));
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getPosts();
      })
      .catch((err) => {
        setPosts(isDeletingPost(id, false));
      });
  }

  function goToPreviousPage() {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }

  function goToNextPage() {
    if (currentPage === Math.ceil(100 / postsPerPage)) {
      return;
    }
    setCurrentPage(currentPage + 1);
  }

  function handlePostsPerPageChange(e) {
    setPostsPerPage(e.target.value);
    if (currentPage === 1) {
      return getPosts(e.target.value);
    }
    setCurrentPage(1);
  }

  function searchPosts(e) {
    let value = e.target.value;
    setSearchQuery(value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      let timeout = setTimeout(() => {
        getPosts(postsPerPage, value);
      }, 500);
      setSearchTimeout(timeout);
    } else {
      let timeout = setTimeout(() => {
        getPosts(postsPerPage, value);
      }, 500);
      setSearchTimeout(timeout);
    }
    setCurrentPage(1);
  }

  return (
    <>
      <div className="text-center">
        <h3>My POSTS API</h3>
        <div className="search-input w-50 p-3">
          <Form.Control
            type="text"
            placeholder="Search a keyword"
            value={searchQuery}
            onChange={searchPosts}
          />
        </div>
      </div>

      <Posts
        error={error}
        setError={setError}
        loadingPosts={loadingPosts}
        setLoadingPosts={setLoadingPosts}
        posts={posts}
        setPosts={setPosts}
        getPosts={getPosts}
        isDeletingPost={isDeletingPost}
        handleDelete={handleDelete}
      />
      <Container>
        <Button
          disabled={currentPage === 1}
          className="mr-4"
          onClick={goToPreviousPage}
        >
          Previous
        </Button>
        <Button
          disabled={currentPage === Math.ceil(100 / postsPerPage)}
          onClick={goToNextPage}
          className="mr-4"
        >
          Next
        </Button>

        <select onChange={handlePostsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </Container>
    </>
  );
}
