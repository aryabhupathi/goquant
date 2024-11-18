"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getOrderBook } from "../api/stockapi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Grid from "@mui/material/Grid2";
import { Typography, Paper, Popover, Box } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
import InfoIcon from "@mui/icons-material/Info";
const SpreadIndicator = ({ selectedPair }) => {
  const [spreadData, setSpreadData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrderBook(selectedPair);
      const bestBid = parseFloat(data.bids[0][0]);
      const bestAsk = parseFloat(data.asks[0][0]);
      const spread = bestAsk - bestBid;
      setSpreadData((prev) => [...prev.slice(-59), spread]);
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [selectedPair]);
  const chartData = {
    labels: spreadData.map((_, index) => index),
    datasets: [
      {
        label: "Spread (USD)",
        data: spreadData,
        fill: false,
        borderColor: "rgb(0, 150, 136)",
        backgroundColor: "rgba(0, 150, 136, 0.2)",
        tension: 0.1,
        pointBackgroundColor: "rgba(255, 99, 132, 0.8)",
        pointBorderColor: "rgba(255, 99, 132, 0.8)",
        pointHoverBackgroundColor: "rgba(255, 159, 64, 0.8)",
        pointHoverBorderColor: "rgba(255, 159, 64, 0.8)",
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#37474f",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "rgba(0, 150, 136, 1)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (Sec)",
          color: "#37474f",
          font: {
            weight: "bold",
            lineHeight: 1.2,
          },
        },

        ticks: {
          color: "#37474f",
        },
      },
      y: {
        title: {
          display: true,
          text: "Spread (USD)",
          color: "#37474f",
          font: {
            weight: "bold",
            lineHeight: 1.2,
          },
        },
        ticks: {
          color: "#37474f",
        },
        beginAtZero: true,
      },
    },
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#001f3f",
        padding: 3,
      }}
    >
      <Grid item="true" size={12}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: "12px",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #00796b",
              paddingBottom: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#00796b",
                fontWeight: "bold",
              }}
            >
              Spread Indicator
            </Typography>
            {/* Info Icon with Popover */}
            <Box
              sx={{ display: "flex", alignItems: "center" }}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
            >
              <InfoIcon sx={{ color: "#00796b", cursor: "pointer" }} />
            </Box>
            <Popover
              id="mouse-over-popover"
              sx={{ pointerEvents: "none" }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Box
                sx={{
                  border: "2px solid #00796b",
                  backgroundColor: "#fafafa",
                  padding: 2,
                  maxWidth: "400px",
                  color: "#37474f",
                }}
              >
                <Typography>
                  The spread indicator displays the difference between the best
                  bid (the highest price buyers are willing to pay) and the best
                  ask (the lowest price sellers are willing to accept). A
                  smaller spread usually indicates higher liquidity, while a
                  larger spread may suggest lower liquidity or higher
                  volatility.
                </Typography>
              </Box>
            </Popover>
          </Grid>
          <Grid mt={2} sx={{ height: "300px", width: "100%" }}>
            <Line data={chartData} options={chartOptions} />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SpreadIndicator
