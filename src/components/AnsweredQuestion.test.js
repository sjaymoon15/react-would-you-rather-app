import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../utils/testUtils';
import AnsweredQuestion from './AnsweredQuestion';
import { users, questions, qid, authedUser } from '../utils/_DATA';

const defaultProps = {
  question: questions[qid],
  author: users[authedUser],
  authedUser,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<AnsweredQuestion {...setupProps} />);
};

describe('AnsweredQuestion', () => {
  it('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-answered-question');
    expect(component.length).toBe(1);
  });
});
