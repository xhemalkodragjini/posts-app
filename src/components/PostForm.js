import React from "react";
import { useFormik } from "formik";
import { Form as FormReact, Button, Container } from "react-bootstrap";
import "./Form.css";

export default function PostForm(props) {
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: (values, { resetForm }) => {
      props.handleSubmit(values);
    },
  });

  return (
    <Container className="form-container">
      {props.status === "create" ? (
        <h3 className="text-center mb-5">Create New Form</h3>
      ) : (
        <h1>Edit Form</h1>
      )}
      <FormReact onSubmit={formik.handleSubmit}>
        <FormReact.Group>
          <FormReact.Control
            name="userId"
            type="text"
            placeholder="User ID"
            onChange={formik.handleChange}
            value={formik.values.userId}
          />
        </FormReact.Group>
        <FormReact.Group>
          <FormReact.Control
            name="title"
            type="text"
            placeholder="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </FormReact.Group>
        <FormReact.Group>
          <FormReact.Control
            as="textarea"
            rows="6"
            name="body"
            placeholder="Body"
            onChange={formik.handleChange}
            value={formik.values.body}
          />
        </FormReact.Group>
        <Button
          variant="info"
          className="btn-block"
          type="submit"
          disabled={props.isLoading}
        >
          {props.isLoading ? "Loading..." : "Submit"}
        </Button>
        <Button
          variant="warning"
          className="btn-block"
          onClick={props.handleCancel}
          disabled={props.isLoading}
        >
          Cancel
        </Button>
      </FormReact>
    </Container>
  );
}
