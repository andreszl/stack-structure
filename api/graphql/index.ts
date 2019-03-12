import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from './user';

export const modules = new GraphQLModule({
  imports: [
    UserModule
  ],
});