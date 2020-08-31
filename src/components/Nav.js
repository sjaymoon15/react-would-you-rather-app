import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => {
    // handle auth condition and show signin/ signout and
    // navigate differently
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to='/'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/add'
            name='newQuestion'
            active={activeItem === 'newQuestion'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/leaderboard'
            name='leaderBoard'
            active={activeItem === 'leaderBoard'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Nav;
