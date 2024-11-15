"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import OrderBookWithPairSelector from "./components/OrderBookWithPairSelector";
import SpreadIndicator from "./components/SpreadIndicator";
import OrderBookSide from "./components/OrderBookSide";
import MarketDepthChart from "./components/MarketDepthChart";
import { Typography } from "@mui/material";
export default function Home() {
  const [selectedPair, setSelectedPair] = useState("BTCUSDT");
  return (
    <Grid
      container
      spacing={2}
      justifyContent={"center"}
      sx={{
        backgroundImage: "url(../stock.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
      }}
    >
      <Typography variant="h4" color="gold" mt={3}>
        TRACKSTOCK
      </Typography>
      <Grid size={10}>
        <OrderBookWithPairSelector />
      </Grid>
      <Grid size={10}>
        <SpreadIndicator selectedPair={selectedPair} />
      </Grid>
      <Grid size={10}>
        <OrderBookSide selectedPair={selectedPair} />
      </Grid>
      <Grid size={10}>
        <MarketDepthChart selectedPair={selectedPair} />
      </Grid>
    </Grid>
  );
}
