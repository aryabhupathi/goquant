"use client";
import { useEffect, useState } from "react";
import { getOrderBook } from "../api/stockapi";
import { Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
const gridStyle = {
  backgroundColor: "#111827",
  padding: 3,
};
const paperStyle = {
  padding: 4,
  textAlign: "center",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  backgroundColor: "#1F2937",
};
const titleStyle = {
  color: "#8B5CF6",
  marginBottom: 2,
  fontWeight: "bold",
};
const imbalanceTextStyle = (isPositive) => ({
  color: isPositive ? "#10B981" : "#EF4444",
  fontWeight: "bold",
  fontSize: "1.5rem",
});
const ImbalanceIndicator = ({ selectedPair }) => {
  const [imbalance, setImbalance] = useState(0);
  const [isPositive, setIsPositive] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrderBook(selectedPair);
        const totalBids = data.bids.reduce(
          (sum, bid) => sum + parseFloat(bid[1]),
          0
        );
        const totalAsks = data.asks.reduce(
          (sum, ask) => sum + parseFloat(ask[1]),
          0
        );
        const imbalanceValue =
          ((totalBids - totalAsks) / (totalBids + totalAsks)) * 100;
        setImbalance(imbalanceValue.toFixed(2));
        setIsPositive(imbalanceValue >= 0);
      } catch (error) {
        console.error("Error fetching order book data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [selectedPair]);
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={gridStyle}
    >
      <Grid item="true" size={12}>
        <Paper elevation={3} sx={paperStyle}>
          <Typography variant="h5" gutterBottom sx={titleStyle}>
            Orderbook Imbalance
          </Typography>
          <Typography variant="h6" sx={imbalanceTextStyle(isPositive)}>
            Imbalance: {imbalance}%
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ImbalanceIndicator;
