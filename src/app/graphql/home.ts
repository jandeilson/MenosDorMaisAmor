import gql from "graphql-tag";

export const queryUsersAndTestimonails = gql` 
query {
    userMany {
      _id
      firstName
      lastName
      email
      phone
    }
    testimonialMany {
      user
      text
      state
      city
    }
  }
`;