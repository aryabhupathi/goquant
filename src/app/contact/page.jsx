

"use client";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

const cardStyle = {
  backgroundColor: "#003366",
  color: "white",
  boxShadow: 4,
  height:'300px',
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: 8,
  },
};
const iconStyle = {
  color: "white",
  fontSize: 32,
};

const ContactUsPage = () => {
  return (
    <Container sx={{ py: 3 }}>
      {/* Header Section */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#FFD700" }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", mb: 4, color: "#e0e0e0" }}
      >
        Get in touch with us through the details below. We're here to assist you!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item='true' size={{xs:12, sm:6, md:4}}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#FFD700" }}
              >
                Personal Contact
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Email:</strong> bhupathikonduru@gmail.com
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Phone:</strong> +91-6303460916
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Address:</strong> Bangalore
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt:'5px', justifyContent: "center" }}>
                <a
                  href="https://github.com/aryabhupathi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub sx={iconStyle} />
                </a>
                <a
                  href="https://www.linkedin.com/in/arya-bhupathi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn sx={iconStyle} />
                </a>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item='true' size={{xs:12, sm:6, md:4}}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#FFD700" }}
              >
                Corporate Contact
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Email:</strong> info@goquant.io
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Phone:</strong> +1 (305) 239-4196
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Location:</strong> 
                <br />
                HEADQUARTERS
                <br />
                150 SE 2nd Ave, Ste 401
                <br />
                Miami, FL 33131
                <br />
                United States
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#FFD700" }}
          gutterBottom
        >
          We're Here to Help!
        </Typography>
        <Typography variant="body1" sx={{ color: "#e0e0e0" }}>
          Whether you're new to cryptocurrency or a seasoned investor, our
          support team is ready to assist you. Reach out through the contact
          details above, and we’ll get back to you as soon as possible.
        </Typography>
      </Box>
    </Container>
  );
};

export default ContactUsPage;
