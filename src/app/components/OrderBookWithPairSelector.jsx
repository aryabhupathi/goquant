"use client";
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
export default function OrderBookWithPairSelector({
  selectedPair,
  setSelectedPair,
}) {
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
      <Grid item="true" size={12}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
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
              background: "linear-gradient(to right, #FF5722, #4CAF50)",
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
            <Grid item="true" size={12}>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  backgroundColor: "rgba(255, 87, 34, 0.15)",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#FF5722",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderBottom: "3px solid #FF7043",
                  }}
                >
                  Asks
                </Typography>
                {isMobile ? (
                  <TableContainer
                    sx={{ backgroundColor: "rgba(255, 87, 34, 0.1)" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#FF7043",
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
                                color: "#FF7043",
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
                              color: "#FF5722",
                            }}
                          >
                            Value
                          </TableCell>
                          {askValues.map((value, index) => (
                            <TableCell
                              key={index}
                              sx={{
                                textAlign: "center",
                                color: "#FF5722",
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
                    sx={{ backgroundColor: "rgba(255, 87, 34, 0.1)" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#E64A19",
                            }}
                          >
                            Price
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", color: "#D84315" }}
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
                                color: "#E64A19",
                              }}
                            >
                              {price}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                color: "#D84315",
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
            <Grid item="true" size={12}>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  backgroundColor: "rgba(76, 175, 80, 0.15)",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#4CAF50",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderBottom: "3px solid #388E3C",
                  }}
                >
                  Bids
                </Typography>
                {isMobile ? (
                  <TableContainer
                    sx={{ backgroundColor: "rgba(76, 175, 80, 0.1)" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#4CAF50",
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
                                color: "#4CAF50",
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
                            sx={{ textAlign: "center", color: "#388E3C" }}
                          >
                            Value
                          </TableCell>
                          {bidValues.map((value, index) => (
                            <TableCell
                              key={index}
                              sx={{ textAlign: "center", color: "#388E3C" }}
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
                    sx={{ backgroundColor: "rgba(76, 175, 80, 0.1)" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#388E3C",
                            }}
                          >
                            Price
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", color: "#4CAF50" }}
                          >
                            Value
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bidPrices.map((price, index) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "#388E3C",
                              }}
                            >
                              {price}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                color: "#4CAF50",
                              }}
                            >
                              {bidValues[index]}
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

