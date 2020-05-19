import gql from 'graphql-tag';

const HABA_REPLY = gql`
  mutation Haba_reply($habaId: String!, $reply: String!) {
    haba_reply(habaId: $habaId, reply: $reply) {
      status
      message
    }
  }
`;

export default HABA_REPLY;
