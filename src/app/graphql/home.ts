import gql from 'graphql-tag';

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
      _id
      user
      text
      state
      city
      category
      interests
      createdAt
      approved
    }
  }
`;

export const queryStates = gql`
  query {
    stateMany {
      _id
      initials
      name
    }
  }
`;
