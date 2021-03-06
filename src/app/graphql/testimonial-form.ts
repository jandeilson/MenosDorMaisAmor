import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class TestimonialGQL extends Mutation {
  document = gql`
    mutation(
      $user: MongoID!
      $text: String!
      $state: String!
      $city: String!
      $mediaPhotos: [JSON!]
      $category: String!
      $help: Boolean!
      $approved: Boolean!
    ) {
      testimonialCreateOne(
        record: {
          user: $user
          text: $text
          state: $state
          city: $city
          media: { photo: $mediaPhotos }
          category: $category
          help: $help
          approved: $approved
        }
      ) {
        record {
          user
          text
          state
          city
          media
          category
          help
          approved
        }
      }
    }
  `;
}
