import { gql } from "@apollo/client";

export const HOMEPAGEDATA = gql`
  query {
    homePages {
      documentId
      createdAt
      homeDescription
      homeTitle_2
      title1
      updatedAt
      homeBanner {
        url
      }
    }
  }
`;
