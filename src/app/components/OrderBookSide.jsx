'use client'
import { useEffect, useState } from 'react';
import { getOrderBook } from '../api/stockapi';
import { Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
export default function OrderBookSide({ selectedPair }) {
  const [imbalance, setImbalance] = useState(0);
  const [isPositive, setIsPositive] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrderBook(selectedPair);
      const totalBids = data.bids.reduce((sum, bid) => sum + parseFloat(bid[1]), 0);
      const totalAsks = data.asks.reduce((sum, ask) => sum + parseFloat(ask[1]), 0);
      const imbalanceValue = ((totalBids - totalAsks) / (totalBids + totalAsks)) * 100;
      setImbalance(imbalanceValue.toFixed(2));
      setIsPositive(imbalanceValue >= 0);
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
      sx={{
        backgroundColor: "#001f3f",
        padding: 3,
      }}
    >
      <Grid item='true' size={12}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: 'center',
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ color: '#1565c0', marginBottom: 2, 
              fontWeight:'bold' }}
          >
            Orderbook Imbalance
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: isPositive ? '#43a047' : '#e53935', 
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            Imbalance: {imbalance}%
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
