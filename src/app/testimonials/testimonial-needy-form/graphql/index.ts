import { User, Testimonial } from './types';
import gql from "graphql-tag";

export const mutationUser = gql`
mutation($firstName: String!, $lastName: String!, $email: String!, $phone: Float!) {
  userCreateOne(
    record: {
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
    }
  ) {
    record {
      _id
      firstName
      lastName
      email
      phone
      testimonial
    }
  }
}
`;

export const mutationTestimonial = gql`
mutation ($user: MongoID!, $text: String!, $state: String!, $city: String!, $mediaPhotos: [JSON!]) {
  testimonialCreateOne(
    record: {
      user: $user
      text: $text
      state: $state
      city: $city
      media: {
        photo: $mediaPhotos
      }

    }
  ) {
    record {
      user
      text
      state
      city
      media
    }
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


export const queryCities = gql`
query ($stateId: String!) {
  cityMany (filter: {state: $stateId}) {
    _id
    name
    state
  }
}
`;

export interface CreateMutationResponse {
  user: User;
  testimonial: Testimonial;
  loading: boolean;
}