import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        const { match, location, history } = this.props;
        let redirectUrl = '';
        if (location.pathname) {
          redirectUrl = redirectUrl + location.pathname.substring(1);
        }
        if (location.search) {
          redirectUrl = redirectUrl + location.search;
        }

        console.log({ match, location });
        if (redirectUrl) {
          history.push(`/signin?redirectUrl=${redirectUrl}`);
        } else {
          history.push('/signin');
        }
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    console.log('state in private route', state);
    return { auth: state.auth.authedUser };
  }

  return withRouter(connect(mapStateToProps)(ComposedComponent));
};
