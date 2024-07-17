import { GraphQLClient } from "graphql-request";
import { config } from "dotenv";
import { getProductsCountQuery, getProductsQuery } from "../services/query.js";
import { updateProductMutation } from "../services/mutation.js";

config();

const RotechClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
  headers: {
    "X-Shopify-Access-Token": process.env.ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

export const changeProductsHandle = async (req, res) => {
  try {
    let products = [],
      productsQueryPageResponse,
      cursor = null,
      changedCounts = 0;

    while (true) {
      productsQueryPageResponse = await RotechClient.request(getProductsQuery, {
        numProducts: 250,
        cursor: cursor,
      });
      productsQueryPageResponse.products.nodes.forEach((product) => {
        if (product.productTitle)
          products.push({ id: product.id, newTitle: product.productTitle });
      });
      if (productsQueryPageResponse.products.pageInfo.hasNextPage)
        cursor = productsQueryPageResponse.products.pageInfo.endCursor;
      else break;
    }

    await Promise.all(
      products.map(async (product) => {
        try {
          await RotechClient.request(updateProductMutation, {
            input: {
              id: product.id,
              handle: product.newTitle.value,
            },
          });
          changedCounts++;
          return true;
        } catch (error) {
          console.error(error);
        }
      })
    );

    return res.status(200).json({
      renamed_counts: changedCounts,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProductsCount = async (req, res) => {
  try {
    const getProductsCountQueryResponse = await RotechClient.request(
      getProductsCountQuery,
      {}
    );
    return res.status(200).json({
      total_counts: getProductsCountQueryResponse.productsCount.count,
    });
  } catch (error) {
    console.error(error);
  }
};
