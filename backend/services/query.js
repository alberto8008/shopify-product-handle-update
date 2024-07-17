import { gql } from "graphql-request";

export const getProductsCountQuery = gql`
  query {
    productsCount {
      count
    }
  }
`;

export const getProductsQuery = gql`
  query ($numProducts: Int!, $cursor: String) {
    products(first: $numProducts, after: $cursor) {
      nodes {
        id
        productTitle: metafield(namespace: "custom", key: "product_title") {
          value
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
