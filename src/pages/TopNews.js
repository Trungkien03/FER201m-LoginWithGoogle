import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Context } from "../contexts/Context";
const defaultTheme = createTheme();
export const TopNews = () => {
  const { news } = React.useContext(Context);
  const attractiveNews = news.filter((item) => item.actractive === true);
  let mostViewNews = [];
  if (attractiveNews.length > 0) {
     mostViewNews = attractiveNews.sort((a, b) => b.views - a.views);
    // The `mostViewNews` array will now be sorted in descending order based on the `views` property
    
  }else {
    return(
      <div>
        Loading....
      </div>
    )
  }
  console.log(news);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              fontFamily={"sans-serif"}
            >
              Top News
            </Typography>
            <Typography
              component="h5"
              variant="h6"
              align="center"
              color="text.secondary"
              gutterBottom
              fontFamily={"sans-serif"}
            >
              Most views news list
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {mostViewNews.map((context) => (
              <Grid item key={context.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component={Link}
                    to={`/detail/${context.id}`}
                    sx={{
                      // 16:9
                      pt: "100%",
                    }}
                    image={context.img}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6">
                      <a
                        style={{
                          textDecoration: "none",
                          borderBottom: "none",
                          color: "black",
                          fontWeight: "bold",
                        }}
                        href={`/detail/${context.id}`}
                      >
                        {context.title}
                      </a>
                    </Typography>
                    <Typography variant="h7">{context.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`/detail/${context.id}`}
                      size="large"
                      variant="contained"
                    >
                      Detail
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};
