import React from 'react';
import { Message } from 'semantic-ui-react';

const NotFoundPage = () => (
  <Message negative>
    <Message.Header>404</Message.Header>
    <p>Sorry, we couldn't find this page.</p>
  </Message>
);

export default NotFoundPage;
