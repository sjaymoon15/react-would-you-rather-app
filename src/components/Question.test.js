import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../utils/testUtils';
import Question from './Question';
import { users, questions, qid } from '../utils/_DATA';

const defaultProps = { question: questions[qid], users };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Question {...setupProps} />);
};

describe('Question', () => {
  it('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-question');
    expect(component.length).toBe(1);
  });
});
