import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../utils/testUtils';
import { UnconnectedNav } from './Nav';
import { users, authedUser } from '../utils/_DATA';
import * as routes from '../constants/routes';

describe('render', () => {
  describe('when user is signed in', () => {
    let wrapper;
    const mockProps = {
      authedUser,
      users,
      location: jest.fn(),
      logout: jest.fn(),
      fetchUsers: jest.fn(),
    };

    beforeEach(() => {
      wrapper = shallow(<UnconnectedNav {...mockProps} />);
    });

    it('renders home link', () => {
      const component = findByTestAttr(wrapper, 'nav-link-home');
      expect(component.length).toBe(1);
      expect(component.prop('to')).toEqual(`${routes.HOME}`);
    });

    it('renders new question link', () => {
      const component = findByTestAttr(wrapper, 'nav-link-new-question');
      expect(component.length).toBe(1);
      expect(component.prop('to')).toEqual(`${routes.NEW_QUESTION}`);
    });

    it('renders leader board link', () => {
      const component = findByTestAttr(wrapper, 'nav-link-leader-board');
      expect(component.length).toBe(1);
      expect(component.prop('to')).toEqual(`${routes.LEADER_BOARD}`);
    });

    it('renders logout link', () => {
      const component = findByTestAttr(wrapper, 'nav-link-logout');
      expect(component.length).toBe(1);
    });
  });

  describe('when user is not signed in', () => {
    let wrapper;
    const mockProps = {
      authedUser: '',
      users,
      location: jest.fn(),
      logout: jest.fn(),
      fetchUsers: jest.fn(),
    };

    beforeEach(() => {
      wrapper = shallow(<UnconnectedNav {...mockProps} />);
    });

    it('renders home link', () => {
      const component = findByTestAttr(wrapper, 'nav-link-home');
      expect(component.length).toBe(1);
      expect(component.prop('to')).toEqual(`${routes.HOME}`);
    });

    it('renders new question link', () => {
      const component = findByTestAttr(wrapper, 'nav-link-new-question');
      expect(component.length).toBe(1);
      expect(component.prop('to')).toEqual(`${routes.NEW_QUESTION}`);
    });

    it('renders leader board link', () => {
      const component = findByTestAttr(wrapper, 'nav-link-leader-board');
      expect(component.length).toBe(1);
      expect(component.prop('to')).toEqual(`${routes.LEADER_BOARD}`);
    });

    it('does not render logout link', () => {
      const component = findByTestAttr(wrapper, 'nav-link-logout');
      expect(component.length).toBe(0);
    });
  });
});

describe('componentDidMount', () => {
  const fetchUsersMock = jest.fn();

  describe('when prop has users property', () => {
    const mockProps = {
      authedUser,
      users,
      location: jest.fn(),
      logout: jest.fn(),
      fetchUsers: fetchUsersMock,
    };

    it('does not call fetchUsers function', () => {
      const wrapper = shallow(<UnconnectedNav {...mockProps} />);

      wrapper.instance().componentDidMount();

      const fetchUsersCallCount = fetchUsersMock.mock.calls.length;
      expect(fetchUsersCallCount).toBe(0);
    });
  });

  describe('when prop does not have users property', () => {
    const mockProps = {
      authedUser,
      users: null,
      location: jest.fn(),
      logout: jest.fn(),
      fetchUsers: fetchUsersMock,
    };

    it('calls fetchUsers prop function', () => {
      const wrapper = shallow(<UnconnectedNav {...mockProps} />);

      wrapper.instance().componentDidMount();

      const fetchUsersCallCount = fetchUsersMock.mock.calls.length;
      expect(fetchUsersCallCount).not.toBe(0);
    });
  });
});

describe('logout', () => {
  const logoutMock = jest.fn();
  const historyMock = { push: jest.fn() };
  const mockProps = {
    authedUser,
    users,
    location: jest.fn(),
    fetchUsers: jest.fn(),
    logout: logoutMock,
    history: historyMock,
  };

  it('clicking logout link calls logout, history prop functions', () => {
    const wrapper = shallow(<UnconnectedNav {...mockProps} />);
    const logoutLink = findByTestAttr(wrapper, 'nav-link-logout');

    logoutLink.simulate('click');

    const logoutCallCount = logoutMock.mock.calls.length;
    const historyCallCount = historyMock.push.mock.calls.length;
    expect(logoutCallCount).toBe(1);
    expect(historyCallCount).toBe(1);
  });
});
