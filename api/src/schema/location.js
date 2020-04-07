import { State, StateTC } from '../models/location';

const StateQuery = {
    stateById: StateTC.getResolver('findById'),
    stateByIds: StateTC.getResolver('findByIds'),
    stateOne: StateTC.getResolver('findOne'),
    stateMany: StateTC.getResolver('findMany'),
    stateCount: StateTC.getResolver('count'),
    stateConnection: StateTC.getResolver('connection'),
    statePagination: StateTC.getResolver('pagination'),
};

const StateMutation = {
    stateCreateOne: StateTC.getResolver('createOne'),
    stateCreateMany: StateTC.getResolver('createMany'),
    stateUpdateById: StateTC.getResolver('updateById'),
    stateUpdateOne: StateTC.getResolver('updateOne'),
    stateUpdateMany: StateTC.getResolver('updateMany'),
    stateRemoveById: StateTC.getResolver('removeById'),
    stateRemoveOne: StateTC.getResolver('removeOne'),
    stateRemoveMany: StateTC.getResolver('removeMany'),
};

export { StateQuery, StateMutation };