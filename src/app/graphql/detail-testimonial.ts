import gql from "graphql-tag";

export const testimonialQuery = gql` 
query ($testimonialId: MongoID!) {
    testimonialById (_id: $testimonialId) {
        _id
        user
        text
        state
        city
        category
        help
    }
  }
`;

export const userQuery = gql` 
query ($userId: MongoID!) {
    userById (_id: $userId) {
      _id
      firstName
      lastName
      email
      phone
    }

  }
`;