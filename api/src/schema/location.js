import { State, StateTC, City, CityTC } from '../models/location';

// State schema
const StateQuery = {
    stateById: StateTC.getResolver('findById'),
    stateByIds: StateTC.getResolver('findByIds'),
    stateOne: StateTC.getResolver('findOne'),
    stateMany: StateTC.getResolver('findMany'),
    stateCount: StateTC.getResolver('count'),
    stateConnection: StateTC.getResolver('connection'),
    statePagination: StateTC.getResolver('pagination'),
};

// City Schema
const CityQuery = {
    cityById: CityTC.getResolver('findById'),
    cityByIds: CityTC.getResolver('findByIds'),
    cityOne: CityTC.getResolver('findOne'),
    cityMany: CityTC.getResolver('findMany'),
    cityCount: CityTC.getResolver('count'),
    cityConnection: CityTC.getResolver('connection'),
    cityPagination: CityTC.getResolver('pagination'),
};


export { StateQuery, CityQuery };