import React, { Component } from 'react';
import { Card, Dropdown, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchUsers, signIn } from '../actions';
import { withRouter } from 'react-router-dom';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedUserId: '' };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  onChange(event, data) {
    this.setState(() => ({ selectedUserId: data.value }));
  }

  onClick(event, data) {
    const { selectedUserId } = this.state;

    if (selectedUserId) {
      const { users, history } = this.props;
      this.props.signIn(users[selectedUserId]);
      history.push('/');
    }
  }

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
  const usersForDropdown =
    Object.values(state.users).map((user) => {
      return {
        key: user.id,
        text: user.name,
        value: user.id,
        image: { avatar: true, src: user.avatarURL },
      };
    }) || [];
  return { users: state.users, usersForDropdown };
};
export default withRouter(
  connect(mapStateToProps, { fetchUsers, signIn })(SignInPage)
);
