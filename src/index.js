/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import type { GraphQLObjectTypeConfig } from 'graphql';

type User = {
  _id: string,
  name: string,
  email: string,
  active: boolean,
};

type Context = {
  awesome: string,
};

const User2Type = new GraphQLObjectType(({
  name: 'User2',
  description: 'User data',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: user => user._id,
    },
    name: {
      type: GraphQLString,
      // $ExpectError: Property not found in object type
      resolve: user => user.name2,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    active: {
      type: GraphQLBoolean,
      resolve: user => user.active,
    },
    myContext: {
      type: GraphQLBoolean,
      // $ExpectError: Property not found in object type
      resolve: (user, args, context) => context.awesome1,
    }
  }),
}: GraphQLObjectTypeConfig<User, Context>));
