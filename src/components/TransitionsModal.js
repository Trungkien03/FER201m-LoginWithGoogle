import React, { useContext, useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Context } from "../contexts/Context";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// for validate form
import { useFormik } from "formik";
import * as Yup from "yup";

const initialState = {
  name: "",
  avatar: "",
  age: "",
  address: "",
  createdAt: new Date().toISOString(),
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: "90vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  outline: "none",
};

export default function TransitionsModal({ staffId, handleClose }) {
  const [singleStaff, setSingleStaff] = useState({});
  const open = Boolean(staffId);
  const { news, FormatDate, handleUpdate } = useContext(Context);
  const [staffCreatedDate, setStaffCreatedDate] = useState("");
  useEffect(() => {
    const findStaffById = (id) => {
      return news.find((staff) => staff.id === id);
    };

    if (staffId) {
      const foundStaff = findStaffById(staffId);
      setSingleStaff(foundStaff);
      const foundStaffDateFormat = FormatDate(foundStaff.createdAt);
      setStaffCreatedDate(foundStaffDateFormat);
    }
  }, [staffId, news, FormatDate]);

  const formik = useFormik({
    initialValues: singleStaff,
    enableReinitialize: true, // Thêm thuộc tính enableReinitialize để cập nhật lại giá trị khi initialValues thay đổi
    onSubmit: async (values) => {
      await handleUpdate(staffId, values); // Sử dụng giá trị values từ formik thay vì singleStaff
      handleClose(); // Đóng modal sau khi hoàn thành cập nhật
    },
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
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update formik's values
    formik.handleChange(event);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form
              style={{ textAlign: "center" }}
              onSubmit={formik.handleSubmit}
            >
              <Typography
                style={{ marginTop: "250px" }}
                variant="h3"
                id="modal-title"
              >
                News Details
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={formik.values.img}
                  alt="Avatar"
                  style={{
                    width: "50%",
                    height: "100%",
                    borderRadius: "30px",
                  }}
                />
              </div>
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
                error={formik.touched.description && formik.errors.description}
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                style={{ width: "500px", marginTop: "20px" }}
                id="outlined-basic"
                label="Content"
                variant="outlined"
                name="Content"
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
              <Container
                maxWidth="lg"
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </Container>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
