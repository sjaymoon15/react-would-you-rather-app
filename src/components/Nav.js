import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
    this.props.history.push('/signin');
  }

  render() {
    const { authedUser } = this.props;
    return (
      <div className='nav-menu-container'>
        <Menu pointing secondary>
          <Menu.Item as={Link} to='/' name='home' />
          <Menu.Item as={Link} to='/add' name='newQuestion' />
          <Menu.Item as={Link} to='/leaderboard' name='leaderBoard' />
          <Menu.Menu position='right'>
            {authedUser && <Menu.Item name='logout' onClick={this.logout} />}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { authedUser: state.auth.authedUser };
};

export default withRouter(connect(mapStateToProps, { logout })(Nav));
