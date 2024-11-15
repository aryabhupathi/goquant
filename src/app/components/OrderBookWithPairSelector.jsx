'use client'
import { useEffect, useState } from "react";
import { getOrderBook } from "../api/stockapi";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  TableContainer,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PairSelector from "./PairSelector";
export default function OrderBookWithPairSelector() {
  const [selectedPair, setSelectedPair] = useState("BTCUSDT");
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const isMobile = useMediaQuery("(min-width:600px)");
  const fetchOrderBook = async (pair) => {
    const data = await getOrderBook(pair);
    setOrderBook(data);
  };
  useEffect(() => {
    fetchOrderBook(selectedPair);
    const interval = setInterval(() => fetchOrderBook(selectedPair), 1000);
    return () => clearInterval(interval);
  }, [selectedPair]);
  const getPriceAndValues = (side) => {
    const prices = side.map((item) => parseFloat(item[0]).toFixed(2));
    const values = side.map((item) => parseFloat(item[1]).toFixed(2));
    return { prices, values };
  };
  const { prices: askPrices, values: askValues } = getPriceAndValues(
    orderBook.asks.slice(0, 10)
  );
  const { prices: bidPrices, values: bidValues } = getPriceAndValues(
    orderBook.bids.slice(0, 10)
  );
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#001f3f",
        padding: 3,
        minHeight: "100vh",
      }}
    >
      <Grid item='true' xs={12}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "1200px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              background: "linear-gradient(to right, #ff4500, #32cd32)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              marginBottom: 3,
              fontWeight: "bold",
            }}
          >
            Orderbook
          </Typography>
          <PairSelector onPairChange={setSelectedPair} />
          <Grid container spacing={2}>
            {/* Asks Table */}
            <Grid item='true' size={12} >
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  backgroundColor: "rgba(255, 69, 0, 0.15)",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ff4500",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderBottom: "3px solid #ff6347",
                  }}
                >
                  Asks
                </Typography>
                {isMobile ? (
                  <TableContainer
                    sx={{ backgroundColor: "rgba(255, 69, 0, 0.05)" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#ff6347",
                            }}
                          >
                            Price
                          </TableCell>
                          {askPrices.map((price, index) => (
                            <TableCell
                              key={index}
                              sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "#ff6347",
                              }}
                            >
                              {price}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              color: "#ff4500",
                            }}
                          >
                            Value
                          </TableCell>
                          {askValues.map((value, index) => (
                            <TableCell
                              key={index}
                              sx={{
                                textAlign: "center",
                                color: "#ff4500",
                              }}
                            >
                              {value}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <TableContainer
                    sx={{ backgroundColor: "rgba(255, 69, 0, 0.05)" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#d32f2f",
                            }}
                          >
                            Price
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", color: "#c62828" }}
                          >
                            Value
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {askPrices.map((price, index) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "#d32f2f",
                              }}
                            >
                              {price}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                color: "#c62828",
                              }}
                            >
                              {askValues[index]}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Grid>
            <Grid item='true' size={12}>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  backgroundColor: "rgba(50, 205, 50, 0.15)",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#32cd32",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderBottom: "3px solid #228b22",
                  }}
                >
                  Bids
                </Typography>
                {isMobile ? (
                  <TableContainer
                    sx={{ backgroundColor: "rgba(50, 205, 50,, 0.05)" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#32cd32",
                            }}
                          >
                            Price
                          </TableCell>
                          {bidPrices.map((price, index) => (
                            <TableCell
                              key={index}
                              sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "#32cd32",
                              }}
                            >
                              {price}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{ textAlign: "center", color: "#228b22" }}
                          >
                            Value
                          </TableCell>
                          {bidValues.map((value, index) => (
                            <TableCell
                              key={index}
                              sx={{ textAlign: "center", color: "#228b22" }}
                            >
                              {value}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <TableContainer
                    sx={{ backgroundColor: "rgba(50, 205, 50,, 0.05)" }}
                  >
                    <Table>
                      <TableBody>
                        {bidPrices.map((price, index) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{ fontWeight: "bold", color: "#32cd32" }}
                            >
                              Price: {price}
                            </TableCell>
                            <TableCell sx={{ color: "#228b22" }}>
                              Value: {bidValues[index]}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
