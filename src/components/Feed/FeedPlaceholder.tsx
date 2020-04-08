import React from 'react';
import { Placeholder } from 'semantic-ui-react';

const FeedPlaceholder: any = () => {
  const paragraphs = 10;

  const res = [...Array(paragraphs)].map((e, i) => (
    <Placeholder key={i}>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  ));
  return res;
};
export default FeedPlaceholder;
