import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setRedirectUrl, signIn } from '../actions';
import * as routes from '../constants/routes';
import Cookies from 'universal-cookie';
import { AUTH_COOKIE } from '../constants/variables';

const cookies = new Cookies();

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.authedUser) {
        const authedUser = cookies.get(AUTH_COOKIE);
        if (authedUser) {
          this.props.signIn(authedUser);
          return;
        }
        const { location, history } = this.props;

        if (location.pathname) {
          this.props.setRedirectUrl(location.pathname);
        }

        history.push(routes.SIGN_IN);
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    console.log('state in private route', state);
    return {
      authedUser: state.auth.authedUser,
    };
  };

  return withRouter(
    connect(mapStateToProps, { setRedirectUrl, signIn })(ComposedComponent)
  );
};
