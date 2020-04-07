import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { StateQuery } from './location';
import { TestimonialQuery, TestimonialMutation } from './testimonial';

schemaComposer.Query.addFields({
    ...UserQuery,
    ...TestimonialQuery,
    ...StateQuery
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...TestimonialMutation,
});

export default schemaComposer.buildSchema();