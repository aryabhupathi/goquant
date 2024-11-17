'use client';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {FormControl, MenuItem, Select} from '@mui/material';
export default function PairSelector({ onPairChange }) {
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');
  const handlePairChange = (event) => {
    const pair = event.target.value;
    setSelectedPair(pair);
    onPairChange(pair);
  };
  return (
    <Grid
      container
      justifyContent="right"
      alignItems="center"
      sx={{ marginBottom: 2 }}
    >
      <Grid item='true' size={{xs:12, sm:6, md:4}}>
        <FormControl
          fullWidth
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px',
            padding: 1,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Select
            size="small"
            value={selectedPair}
            onChange={handlePairChange}
            sx={{
              color: '#1976d2',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <MenuItem value="BTCUSDT">BTC-USD</MenuItem>
            <MenuItem value="ETHUSDT">ETH-USD</MenuItem>
            <MenuItem value="XRPUSDT">XRP-USD</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
