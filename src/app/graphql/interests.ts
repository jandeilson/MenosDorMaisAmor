import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})

export class InterestsGQL extends Mutation {
  document = gql`
    mutation ($testimonialId: MongoID!, $count: Float!) {
        testimonialUpdateById (record: {_id: $testimonialId, interests: $count}){
            record {
                _id
                interests
            }
        }
    }
  `;
}