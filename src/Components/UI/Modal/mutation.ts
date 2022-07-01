/*eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/

import { gql, useMutation } from '@apollo/client';

export const CreateRegisterMutation = () => {
  const [eventId] = useMutation<{ registerForEvent: { id: number } }>(gql`
    mutation ($data: registerForEventInput!) {
      registerForEvent(data: $data)
    }
  `);
  return (data: any) => eventId({ variables: { data } });
};
