import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import NewQuestionPage from './NewQuestionPage';
import LeaderBoardPage from './LeaderBoardPage';
import NotFoundPage from './NotFoundPage';
import RouteWithNav from './RouteWithNav';
import QuestionPage from './QuestionPage';

const Root = () => (
  <div>
    <Switch>
      <RouteWithNav exact path='/' component={HomePage} />
      <RouteWithNav exact path='/signin' component={SignInPage} />
      <RouteWithNav exact path='/add' component={NewQuestionPage} />
      <RouteWithNav exact path='/leaderboard' component={LeaderBoardPage} />
      <RouteWithNav path='/questions/:id' component={QuestionPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default Root;
