import React, { useEffect, useState } from "react";
import {
  getProductsCount,
  handleProductsRename,
} from "../services/handleProducts";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const Home = () => {
  const [count, setCount] = useState(0);
  const [renamedCounts, setRenamedCounts] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      const counts = await getProductsCount();
      setCount(counts);
    };
    fetchCount();
  }, []);

  const handleRename = async () => {
    setLoading(true);
    const renamedCounts = await handleProductsRename();
    setLoading(false);
    setRenamedCounts(renamedCounts);
  };

  return (
    <Box display="flex" flexDirection="column" gap="3em">
      <Typography variant="h5">
        Number of products on Rotech store: {count}
      </Typography>

      <LoadingButton
        size="large"
        onClick={handleRename}
        loading={loading}
        variant="contained"
      >
        Update products url
      </LoadingButton>

      <Typography variant="h5">
        Number of products updated:{renamedCounts}
      </Typography>
    </Box>
  );
};
