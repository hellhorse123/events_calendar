import { gql } from '@apollo/client';

export const CREATE_ONE_COMPANY_MUTATION = gql`
  mutation ($data: createCompanyInput!) {
    createCompany(data: $data) {
      name
    }
  }
`;
