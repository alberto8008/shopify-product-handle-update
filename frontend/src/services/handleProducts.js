import axios from "axios";

export const getProductsCount = async () => {
  try {
    const response = await axios.get("http://localhost:4000/products/count");
    console.log(response);
    return response?.data?.total_counts;
  } catch (e) {
    console.error(e);
  }
};

export const handleProductsRename = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/products/change-handle"
    );
    return response?.data?.renamed_counts;
  } catch (e) {
    console.error(e);
  }
};
