import React from 'react';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const NotFoundPage = () => (
  <Message negative>
    <Message.Header>404</Message.Header>
    <p>Sorry, we couldn't find this page.</p>

    <Link to={routes.HOME}>Back to Home</Link>
  </Message>
);

export default NotFoundPage;
