import React, { Component } from 'react';
import { Card, Dropdown, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchUsers, signIn, setRedirectUrl } from '../actions';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';

class SignInPage extends Component {
  state = { selectedUserId: '' };

  componentDidMount() {
    this.props.fetchUsers();
  }

  onChange = (event, data) => {
    this.setState(() => ({ selectedUserId: data.value }));
  };

  onClick = (event, data) => {
    const { selectedUserId } = this.state;
    if (selectedUserId) {
      const { history, redirectUrl } = this.props;
      this.props.signIn(selectedUserId);
      this.props.setRedirectUrl(routes.HOME);
      history.push(redirectUrl);
    }
  };

  render() {
    const { usersForDropdown } = this.props;

    return (
      <div>
        <Card centered>
          <Card.Content>
            <Card.Header>Welcome to the Would You Rather App!</Card.Header>
            <Card.Meta>Please sign in to continue</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Dropdown
              placeholder='Select User'
              fluid
              selection
              options={usersForDropdown}
              onChange={this.onChange}
            />
            <Divider />
            <Button positive fluid onClick={this.onClick}>
              Sign In
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { users } = state;
  let usersForDropdown = [];
  if (users) {
    usersForDropdown = Object.values(users).map((user) => {
      return {
        key: user.id,
        text: user.name,
        value: user.id,
        image: { avatar: true, src: user.avatarURL },
      };
    });
  }

  return {
    usersForDropdown,
    redirectUrl: state.auth.redirectUrl,
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchUsers, signIn, setRedirectUrl })(SignInPage)
);
