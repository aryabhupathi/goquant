"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import OrderBookWithPairSelector from "./components/OrderBookWithPairSelector";
import SpreadIndicator from "./components/SpreadIndicator";
import MarketDepthChart from "./components/MarketDepthChart";
import { Typography } from "@mui/material";
import ImbalanceIndicator from "./components/ImbalanceIndicator";
export default function Home() {
  const [selectedPair, setSelectedPair] = useState("BTCUSDT");
  return (
    
    <Grid
      container
      spacing={2}
      justifyContent={"center"}
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h4" color="gold" mt={3}>
        TRACKSTOCK
      </Typography>
      <Grid size={10}>
        <OrderBookWithPairSelector selectedPair={selectedPair} setSelectedPair={setSelectedPair} />
      </Grid>
      <Grid size={10}>
        <SpreadIndicator selectedPair={selectedPair} />
      </Grid>
      <Grid size={10}>
        <ImbalanceIndicator selectedPair={selectedPair} />
      </Grid>
      <Grid size={10}>
        <MarketDepthChart selectedPair={selectedPair} />
      </Grid>
    </Grid>
    
  );
}
