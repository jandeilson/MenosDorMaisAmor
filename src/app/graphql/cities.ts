import { Query } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';


export interface Cities {
    id: number;
    name: string;
    state: string;
}

export interface Response {
    cityMany: Cities[];
    loading: boolean;
}

@Injectable({
    providedIn: 'root'
})


export class BrazilianCitiesGQL extends Query<Response> {
    
    document = gql`
        query ($stateId: String!) {
            cityMany (filter: {state: $stateId}) {
                _id
                name
                state
            }
        }
        `;

}