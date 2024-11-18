"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getOrderBook } from "../api/stockapi";
import InfoIcon from "@mui/icons-material/Info";
import {
  Paper,
  Typography,
  Box,
  Popover,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
const gridStyle = {
  backgroundColor: "#0a1929",
  padding: 3,
};
const paperStyle = {
  padding: 4,
  borderRadius: "15px",
  width: "100%",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
};
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "2px solid #00796b",
  paddingBottom: 2,
};
const titleStyle = {
  color: "#00796b",
  fontWeight: "bold",
};
const chartContainerStyle = {
  height: "300px",
  width: "100%",
};
const popoverBoxStyle = {
  border: "2px solid #00796b",
  backgroundColor: "#fafafa",
  padding: 2,
  maxWidth: "400px",
  color: "#37474f",
  borderRadius: "8px",
};
const MarketDepthChart = ({ selectedPair }) => {
  const [depthData, setDepthData] = useState({ bids: [], asks: [] });
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrderBook(selectedPair);
        const cumulativeBids = data.bids.map(([price, qty], i) => ({
          price: parseFloat(price),
          qty: data.bids
            .slice(0, i + 1)
            .reduce((sum, bid) => sum + parseFloat(bid[1]), 0),
        }));
        const cumulativeAsks = data.asks.map(([price, qty], i) => ({
          price: parseFloat(price),
          qty: data.asks
            .slice(0, i + 1)
            .reduce((sum, ask) => sum + parseFloat(ask[1]), 0),
        }));
        setDepthData({ bids: cumulativeBids, asks: cumulativeAsks });
      } catch (error) {
        console.error("Error fetching order book data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [selectedPair]);
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: "Cumulative Quantity",
          color: "#333",
          font: {
            weight: "bold",
            lineHeight: 1.2,
          },
        },
        grid: {
          color: "#ddd",
        },
        ticks: {
          color: "#333",
        },
      },
      x: {
        title: {
          display: true,
          text: "Price (USD)",
          color: "#333",
          font: {
            weight: "bold",
            lineHeight: 1.2,
          },
        },
        grid: {
          color: "#ddd",
        },
        ticks: {
          color: "#333",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(0, 0, 0, 0.5)",
        borderWidth: 1,
      },
    },
  };
  const chartData = {
    labels: [
      ...depthData.bids.map((bid) => bid.price),
      ...depthData.asks.map((ask) => ask.price),
    ],
    datasets: [
      {
        label: "Bids",
        data: depthData.bids.map((bid) => bid.qty),
        borderColor: "rgb(75, 192, 192)",
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
      {
        label: "Asks",
        data: depthData.asks.map((ask) => ask.qty),
        borderColor: "rgb(255, 99, 132)",
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
  };
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={gridStyle}
    >
      <Grid item ='true' size={12}>
        <Paper elevation={10} sx={paperStyle}>
          <Grid sx={headerStyle}>
            <Typography variant="h5" sx={titleStyle}>
              Market Depth Chart
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center" }}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
            >
              <IconButton sx={{ color: "#00796b" }}>
                <InfoIcon />
              </IconButton>
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
              <Box sx={popoverBoxStyle}>
                <Typography variant="body1">
                  The <strong>Market Depth Chart</strong> shows the cumulative
                  buy (bids) and sell (asks) orders at different price levels:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <li>
                    <strong>Bids:</strong> Buy orders on the left side indicate
                    strong buying interest at lower prices.
                  </li>
                  <li>
                    <strong>Asks:</strong> Sell orders on the right side
                    indicate more sellers at higher prices.
                  </li>
                </Box>
                <Typography variant="body2">
                  The point where the curves meet represents the current market
                  price, helping traders understand liquidity and potential
                  price movements.
                </Typography>
              </Box>
            </Popover>
          </Grid>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "300px" }}
            >
              <CircularProgress size={50} sx={{ color: "#00796b" }} />
            </Box>
          ) : (
            <Grid mt={2} sx={chartContainerStyle}>
              <Line options={chartOptions} data={chartData} />
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MarketDepthChart
