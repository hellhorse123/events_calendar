/*eslint-disable @typescript-eslint/no-unsafe-assignment*/

import { gql, useMutation, FetchResult } from '@apollo/client';

export const UpdateEventMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [eventName] = useMutation(gql`
    mutation ($data: EventUpdatedInput!) {
      updateOneEvent(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    eventName({ variables: { data } });
};

export const UpdatePostMutation = (): ((
  data: any,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [eventName] = useMutation(gql`
    mutation ($data: updatePostInput!) {
      updatePost(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    eventName({ variables: { data } });
};
