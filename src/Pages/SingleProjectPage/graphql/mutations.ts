/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/

import { useMutation, gql, FetchResult } from '@apollo/client';

export const UpdateProjectMutation = (): ((
  data: any,
  projectId: number,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
  const [projectName] = useMutation(gql`
    mutation ($data: updateProjectInput!) {
      updateProject(data: $data)
    }
  `);
  return (data: any): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> =>
    projectName({ variables: { data } });
};

export const GetUrlToUploadMediaMutation = (): ((
  fileName: string,
  projectId: number,
  mediaType: string,
) => Promise<
  FetchResult<
    {
      putProjectPresentationMedia: {
        signedURL: string;
      };
    },
    Record<string, any>,
    Record<string, any>
  >
>) => {
  const [url] = useMutation<{ putProjectPresentationMedia: { signedURL: string } }>(gql`
    mutation ($fileName: String!, $projectId: Int!, $mediaType: String!) {
      putProjectPresentationMedia(data: { entityId: $projectId, fileName: $fileName, fileType: $mediaType }) {
        signedURL
      }
    }
  `);

  return (
    fileName: string,
    projectId: number,
    mediaType: string,
  ): Promise<
    FetchResult<
      {
        putProjectPresentationMedia: {
          signedURL: string;
        };
      },
      Record<string, any>,
      Record<string, any>
    >
  > => url({ variables: { fileName, projectId, mediaType } });
};

export const GetUrlToUploadPosterMutation = (): ((data: any) => Promise<
  FetchResult<
    {
      putProjectPoster: {
        signedURL: string;
      };
    },
    Record<string, any>,
    Record<string, any>
  >
>) => {
  const [url] = useMutation<{ putProjectPoster: { signedURL: string } }>(gql`
    mutation ($data: getMediaDataInput!) {
      putProjectPoster(data: $data) {
        signedURL
      }
    }
  `);

  return (
    data: any,
  ): Promise<
    FetchResult<
      {
        putProjectPoster: {
          signedURL: string;
        };
      },
      Record<string, any>,
      Record<string, any>
    >
  > => url({ variables: { data } });
};
