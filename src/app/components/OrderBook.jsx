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
const OrderBook = ({ selectedPair, setSelectedPair }) => {
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
        backgroundColor: "#111827",
        padding: 3,
        minHeight: "80vh",
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
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            backgroundColor: "#1F2937",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              background: "linear-gradient(to right, #8B5CF6, #10B981)",
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
                  backgroundColor: "rgba(139, 92, 245, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#8B5CF6",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderBottom: "3px solid #A78BFA",
                  }}
                >
                  Asks
                </Typography>
                {isMobile ? (
                  <TableContainer
                    sx={{
                      backgroundColor: "rgba(139, 92, 245, 0.05)",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#A78BFA",
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
                                color: "#A78BFA",
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
                              color: "#8B5CF6",
                            }}
                          >
                            Value
                          </TableCell>
                          {askValues.map((value, index) => (
                            <TableCell
                              key={index}
                              sx={{
                                textAlign: "center",
                                color: "#8B5CF6",
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
                    sx={{
                      backgroundColor: "rgba(139, 92, 245, 0.05)",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#A78BFA",
                            }}
                          >
                            Price
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              color: "#A78BFA",
                            }}
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
                                color: "#A78BFA",
                              }}
                            >
                              {price}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                color: "#8B5CF6",
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
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#10B981",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderBottom: "3px solid #34D399",
                  }}
                >
                  Bids
                </Typography>
                {isMobile ? (
                  <TableContainer
                    sx={{
                      backgroundColor: "rgba(16, 185, 129, 0.05)",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#34D399",
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
                                color: "#34D399",
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
                              color: "#10B981",
                            }}
                          >
                            Value
                          </TableCell>
                          {bidValues.map((value, index) => (
                            <TableCell
                              key={index}
                              sx={{
                                textAlign: "center",
                                color: "#10B981",
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
                    sx={{
                      backgroundColor: "rgba(16, 185, 129, 0.05)",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#34D399",
                            }}
                          >
                            Price
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              color: "#34D399",
                            }}
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
                                color: "#34D399",
                              }}
                            >
                              {price}
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                color: "#10B981",
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
};
export default OrderBook;
