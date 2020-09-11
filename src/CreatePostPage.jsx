import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PostForm from "./components/PostForm";

export default function CreatePostPage() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  function handleCreation(data) {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        userId: data.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  function handleCancel() {
    history.push("/");
  }

  return (
    <div>
      <PostForm
        handleSubmit={handleCreation}
        isLoading={loading}
        initialValues={{
          userId: "",
          title: "",
          body: "",
        }}
        status="create"
        handleCancel={handleCancel}
      />
    </div>
  );
}
