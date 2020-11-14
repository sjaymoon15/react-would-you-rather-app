import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../utils/testUtils';
import UnansweredQuestion from './UnansweredQuestion';

import { qid, questions, users } from '../utils/_DATA';

const question = questions[qid];
const author = users[question.author];
const handleSubmitMock = jest.fn();

const defaultProps = {
  question,
  author,
  handleSubmit: handleSubmitMock,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<UnansweredQuestion {...setupProps} />);
};

describe('UnansweredQuestion', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-unanswered-question');
    expect(component.length).toBe(1);
  });

  it('renders author name correctly', () => {
    const component = findByTestAttr(
      wrapper,
      'unanswered-question-author'
    ).dive();
    expect(component.text()).toBe(`${author.name} asks:`);
  });

  describe('state change', () => {
    it('initially state "value" is undefined', () => {
      const value = wrapper.instance().state.value;
      expect(value).toBe(undefined);
    });

    it('handleChange updates state value', () => {
      const newOptionValue = 'optionOne';
      wrapper.instance().handleChange(null, { value: newOptionValue });
      const newStateValue = wrapper.instance().state.value;
      expect(newStateValue).toBe(newOptionValue);
    });
  });
});
