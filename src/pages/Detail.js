import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../contexts/Context";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";

export const Detail = () => {
  const { id } = useParams();
  const { news, FormatDate } = useContext(Context);

  const Detail = news.find((obj) => {
    return obj.id === id;
  });
  if (!Detail) {
    return (
      <section className="s-screen flex justify-center items-center">
        Loading....
      </section>
    );
  }

  return (
    <Box className="detail-staff">
      <Box className="card-wrapper">
        <Card className="card">
          {/* Card left */}
          <Box className="img-display">
            <Box className="img-showcase">
              <CardMedia
                component="img"
                alt="shoe image"
                height="auto"
                image={Detail.img}
              />
            </Box>
          </Box>
          <Box className="product-imgs"></Box>
          {/* Card right */}
          <Box className="product-content">
            <CardContent>
              <Typography variant="h4" component="h2" className="product-title">
                {Detail.title}
              </Typography>
              <Box className="product-detail">
                <Typography variant="h5" component="h3">
                  Description:
                </Typography>
                <Typography variant="body1">{Detail.description}</Typography>
                <Typography variant="h5" component="h3">
                  Content:
                </Typography>
                <Typography variant="body2">{Detail.content}</Typography>
                <ul
                  style={{
                    display: "flex",
                    listStyleType: "none",
                    marginLeft: "10px",
                  }}
                >
                  <li style={{ marginRight: "10px" }}>View: {Detail.views}</li>
                  <li style={{ marginRight: "10px" }}>Attractive: {Detail.attractive ? 'No' : 'Yes'}</li>
                  <li style={{ marginRight: "10px" }}>Status: {Detail.status ? "Active" : "Not Active"}</li>
                </ul>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
