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
      if (!this.props.authedUser) {
        const { location, history } = this.props;
        let redirectUrl = '';

        if (location.pathname) {
          redirectUrl = redirectUrl + location.pathname.substring(1);
        }

        if (location.search) {
          redirectUrl = redirectUrl + location.search;
        }

        redirectUrl
          ? history.push(`/signin?redirectUrl=${redirectUrl}`)
          : history.push('/signin');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    console.log('state in private route', state);
    return { authedUser: state.auth.authedUser };
  };

  return withRouter(connect(mapStateToProps)(ComposedComponent));
};
