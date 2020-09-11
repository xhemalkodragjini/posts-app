import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost";
import PostsPage from "./PostsPage";
import CreatePostPage from "./CreatePostPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PostsPage />
        </Route>
        <Route exact path="/create">
          <CreatePostPage />
        </Route>
        <Route exact path={"/details/:id"}>
          <SinglePost />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
