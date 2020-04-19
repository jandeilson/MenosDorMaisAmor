import { Query } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';


export interface States {
    id: number;
    initials: string;
    name: string;
}

export interface Response {
    stateMany: States[];
    loading: boolean;
}

@Injectable({
    providedIn: 'root'
})


export class BrazilianStatesGQL extends Query<Response> {
    
    document = gql`
        query {
            stateMany {
                _id
                initials
                name
            }
        }
        `;

}