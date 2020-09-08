import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setRedirectUrl } from '../actions';

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

        if (location.pathname) {
          this.props.setRedirectUrl(location.pathname);
        }

        history.push('/signin');
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
    connect(mapStateToProps, { setRedirectUrl })(ComposedComponent)
  );
};
