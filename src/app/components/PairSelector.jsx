'use client';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
export default function PairSelector({ onPairChange }) {
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');
  const handlePairChange = (event) => {
    const pair = event.target.value;
    setSelectedPair(pair);
    onPairChange(pair);
  };
  return (
    <Grid container justifyContent="center" sx={{ marginBottom: 2 }}>
      <FormControl
        sx={{
          minWidth: 200,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: '8px',
          padding: 1,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <InputLabel
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
          }}
        >
          Select Trading Pair
        </InputLabel>
        <Select
          value={selectedPair}
          onChange={handlePairChange}
          label="Select Trading Pair"
          sx={{
            color: '#1976d2',
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <MenuItem value="BTCUSDT">BTC-USD</MenuItem>
          <MenuItem value="ETHUSDT">ETH-USD</MenuItem>
          <MenuItem value="XRPUSDT">XRP-USD</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}
