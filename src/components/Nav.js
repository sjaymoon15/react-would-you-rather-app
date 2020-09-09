import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';
import * as routes from '../constants/routes';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
    this.props.history.push(routes.SIGN_IN);
  }

  render() {
    const { authedUser, location } = this.props;
    return (
      <div className='nav-menu-container'>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to={routes.HOME}
            name='home'
            active={location.pathname === routes.HOME}
          />
          <Menu.Item
            as={Link}
            to={routes.NEW_QUESTION}
            name='newQuestion'
            active={location.pathname === routes.NEW_QUESTION}
          />
          <Menu.Item
            as={Link}
            to={routes.LEADER_BOARD}
            name='leaderBoard'
            active={location.pathname === routes.LEADER_BOARD}
          />
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
