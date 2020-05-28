import { Query, Mutation } from "apollo-angular";
import { Injectable } from "@angular/core";
import gql from "graphql-tag";

export interface Users {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Response {
  userById: Users;
  loading: boolean;
}

@Injectable({
  providedIn: "root",
})

// Users Query
export class UserGQLQuery extends Query<Response> {
  document = gql`
    query($userId: MongoID!) {
      userById(_id: $userId) {
        _id
        firstName
        lastName
        email
        phone
      }
    }
  `;
}

// Users Mutation
export class UserGQLMutation extends Mutation {
  document = gql`
    mutation(
      $firstName: String!
      $lastName: String!
      $email: String!
      $phone: Float!
      $helper: Boolean!
    ) {
      userCreateOne(
        record: {
          firstName: $firstName
          lastName: $lastName
          email: $email
          phone: $phone
          helper: $helper
        }
      ) {
        record {
          _id
          firstName
          lastName
          email
          phone
          helper
        }
      }
    }
  `;
}
