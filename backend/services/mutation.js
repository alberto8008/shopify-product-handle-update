import { gql } from "graphql-request";

export const updateProductMutation = gql`
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        handle
      }
      userErrors {
        field
        message
      }
    }
  }
`;
