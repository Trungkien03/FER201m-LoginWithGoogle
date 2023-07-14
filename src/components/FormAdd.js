import React, { useState, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Context } from "../contexts/Context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
const initialState = {
  title: "",
  description: "",
  content: "",
  img: "",
  status: true,
  views: 1,
  actractive: true,
};

export const FormAdd = () => {
  const [newStaffState, setNewStaffState] = useState(initialState);
  const { handleAddNew } = useContext(Context);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Name is required!")
        .min(5, "Title must be 5 characters or more"),
      views: Yup.number()
        .typeError("Must be a number")
        .required("Views is required!")
        .positive("Views must be a positive number")
        .integer("Views must be an integer"),
      description: Yup.string()
        .required("Description is required!")
        .min(15, "Description must be 15 characters or more"),
      content: Yup.string()
        .required("Content is required!")
        .min(25, "Content must be 25 characters or more"),
      img: Yup.string().required("Image is required!"),
    }),
    onSubmit: async (values) => {
      await handleAddNew(values);
      setIsSubmitted(true);
    },
  });

  if (isSubmitted) {
    return <Navigate to="/dashboard" />; // Chuyển đến trang "/dashboard" sau khi thêm thành công
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update formik's values
    formik.handleChange(event);

    // Update newStaffState, bao gồm cả trường createdAt
    setNewStaffState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            bgcolor: "#cfe8fc",
            height: "100vh",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              noWrap
              component="a"
              href="/"
              sx={{
                margin: "20px",
                fontFamily: "inherit",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Add News
            </Typography>
          </div>
          <div style={{ width: "full", textAlign: "center" }}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        id="status"
                        name="status"
                        checked={formik.values.status}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Status"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        id="actractive"
                        name="actractive"
                        checked={formik.values.actractive}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Actractive"
                  />
                </div>

                <TextField
                  style={{ width: "500px", marginTop: "20px" }}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={formik.values.title || ""}
                  onChange={handleInputChange}
                  error={formik.touched.title && formik.errors.title}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  style={{ width: "500px", marginTop: "20px" }}
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  name="description"
                  multiline
                  rows={3}
                  value={formik.values.description || ""}
                  onChange={handleInputChange}
                  error={
                    formik.touched.description && formik.errors.description
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
                <TextField
                  style={{ width: "500px", marginTop: "20px" }}
                  id="outlined-basic"
                  label="Content"
                  variant="outlined"
                  name="content"
                  multiline
                  rows={3}
                  value={formik.values.content || ""}
                  onChange={handleInputChange}
                  error={formik.touched.content && formik.errors.content}
                  helperText={formik.touched.content && formik.errors.content}
                />
                <TextField
                  style={{ width: "500px", marginTop: "20px" }}
                  id="outlined-basic"
                  label="Image"
                  variant="outlined"
                  name="img"
                  value={formik.values.img || ""}
                  onChange={handleInputChange}
                  error={formik.touched.img && formik.errors.img}
                  helperText={formik.touched.img && formik.errors.img}
                />
                <TextField
                  style={{ width: "500px", marginTop: "20px" }}
                  id="outlined-basic"
                  label="Views"
                  variant="outlined"
                  name="views"
                  value={formik.values.views || ""}
                  onChange={handleInputChange}
                  error={formik.touched.views && formik.errors.views}
                  helperText={formik.touched.views && formik.errors.views}
                />

                <div style={{ marginTop: "20px" }}>
                  <Button type="submit" variant="contained">
                    Add New
                  </Button>
                </div>
              </FormControl>
            </form>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};
