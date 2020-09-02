import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import NewQuestionPage from './NewQuestionPage';
import LeaderBoardPage from './LeaderBoardPage';
import NotFoundPage from './NotFoundPage';
import RouteWithNav from './RouteWithNav';
import QuestionPage from './QuestionPage';
import { Container } from 'semantic-ui-react';
import PrivateRoute from './PrivateRoute';
import { Provider } from 'react-redux';

const Root = ({ store }) => (
  <Provider store={store}>
    <Container>
      <Switch>
        <RouteWithNav exact path='/' component={PrivateRoute(HomePage)} />
        <RouteWithNav exact path='/signin' component={SignInPage} />
        <RouteWithNav
          exact
          path='/add'
          component={PrivateRoute(NewQuestionPage)}
        />
        <RouteWithNav
          exact
          path='/leaderboard'
          component={PrivateRoute(LeaderBoardPage)}
        />
        <RouteWithNav
          path='/questions/:id'
          component={PrivateRoute(QuestionPage)}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Container>
  </Provider>
);

export default Root;
