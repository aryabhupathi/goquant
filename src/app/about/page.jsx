"use client";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
const cardStyle = {
  backgroundColor: "#003366",
  color: "white",
  boxShadow: 4,
  height: "400px",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: 8,
  },
};
const AboutPage = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#FFD700" }}
      >
        ABOUT US
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", mb: 4, color: "#e0e0e0" }}
      >
        Welcome to our cryptocurrency stock app! We’re dedicated to empowering
        investors with cutting-edge tools for smarter and more informed trading
        decisions. Explore our key features below:
      </Typography>
      <Grid container spacing={4}>
        <Grid item="true" size={{ xs: 12, sm: 4 }}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="200"
              image="/stock1.jpg"
              alt="Spread Graph Visualization"
            />
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#FFD700" }}
              >
                Spread Graph
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                The Spread Graph visually represents the difference between the
                highest bid price and the lowest ask price. This feature helps
                you quickly identify market inefficiencies, allowing for better
                timing of trades and improved profitability.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item="true" size={{ xs: 12, sm: 4 }}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="200"
              image="/stock2.jpg"
              alt="Market Depth Chart Visualization"
            />
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#FFD700" }}
              >
                Market Depth Chart
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                The Market Depth Chart provides an in-depth view of buy and sell
                orders at various price levels. Use this tool to assess
                liquidity, gauge market sentiment, and predict potential price
                movements with greater confidence.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item="true" size={{ xs: 12, sm: 4 }}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="200"
              image="/stock3.jpg"
              alt="Imbalance Indicator Visualization"
            />
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#FFD700" }}
              >
                Imbalance Indicator
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                Our Imbalance Indicator highlights the disparity between buy and
                sell orders. This tool allows you to identify potential breakout
                points and trends, giving you a competitive edge in the market.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#FFD700" }}
        >
          Why Choose Us?
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ textAlign: "center", color: "#e0e0e0" }}
        >
          With intuitive tools and real-time data, our app provides a seamless
          trading experience for both beginners and seasoned investors. Whether
          you're analyzing market trends or executing a trade, our platform
          ensures precision and confidence.
        </Typography>
      </Box>
    </Container>
  );
};
export default AboutPage;
