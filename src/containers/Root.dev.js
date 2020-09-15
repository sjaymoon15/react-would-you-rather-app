import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import NewQuestionPage from './NewQuestionPage';
import LeaderBoardPage from './LeaderBoardPage';
import NotFoundPage from './NotFoundPage';
import RouteWithNav from './RouteWithNav';
import PollDetailsPage from './PollDetailsPage';
import { Container } from 'semantic-ui-react';
import PrivateRoute from './PrivateRoute';
import { Provider } from 'react-redux';
import * as routes from '../constants/routes';

const Root = ({ store }) => (
  <Provider store={store}>
    <Container>
      <Switch>
        <RouteWithNav
          exact
          path={routes.HOME}
          component={PrivateRoute(HomePage)}
        />
        <RouteWithNav exact path={routes.SIGN_IN} component={SignInPage} />
        <RouteWithNav
          exact
          path={routes.NEW_QUESTION}
          component={PrivateRoute(NewQuestionPage)}
        />
        <RouteWithNav
          exact
          path={routes.LEADER_BOARD}
          component={PrivateRoute(LeaderBoardPage)}
        />
        <RouteWithNav
          path={`${routes.QUESTIONS}/:question_id`}
          component={PrivateRoute(PollDetailsPage)}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Container>
  </Provider>
);

export default Root;
