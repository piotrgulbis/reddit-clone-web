import { dedupExchange, fetchExchange } from 'urql';

import { cacheExchange } from '@urql/exchange-graphcache';

import {
    LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation
} from '../generated/graphql';
import { improvedUpdateQuery } from './improvedUpdateQuery';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          improvedUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            () => ({ me: null }),
          );
        },
        login: (_result, args, cache, info) => {
          improvedUpdateQuery<LoginMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.login.errors) {
                return query
              } else {
                return {
                  me: result.login.user,
                };
              }
            }
          );
        },

        register: (_result, args, cache, info) => {
          improvedUpdateQuery<RegisterMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.register.errors) {
                return query
              } else {
                return {
                  me: result.register.user,
                };
              }
            }
          );
        }
      }
    }
  }),
  ssrExchange,
  fetchExchange],
});
