import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})

export class TestimonialGQL extends Mutation {
  document = gql`
    mutation ($user: MongoID!, $text: String!, $state: String!, $city: String!, $mediaPhotos: [JSON!], $category: String!, $help: Boolean!) {
        testimonialCreateOne(
            record: {
                user: $user
                text: $text
                state: $state
                city: $city
                media: { photo: $mediaPhotos }
                category: $category
                help: $help
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
}

export class UserGQL extends Mutation {
    document = gql`
        mutation($firstName: String!, $lastName: String!, $email: String!, $phone: Float!, $helper: Boolean!) {
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





