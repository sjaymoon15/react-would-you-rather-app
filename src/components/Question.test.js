import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../utils/testUtils';
import Question from './Question';
import { users, questions, qid } from '../utils/_DATA';
import * as routes from '../constants/routes';

const defaultProps = { question: questions[qid], users };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Question {...setupProps} />);
};

describe('Question', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-question');
    expect(component.length).toBe(1);
  });

  it('shows correct header with author name', () => {
    const component = findByTestAttr(
      wrapper,
      'component-question-header'
    ).dive();
    const author = defaultProps.users[defaultProps.question.author];
    expect(component.text()).toBe(`${author.name} asks:`);
  });

  it('View Poll button has a correct route to attribute', () => {
    const component = findByTestAttr(wrapper, 'component-question-button');
    const question = defaultProps.question;
    expect(component.prop('to')).toEqual(`${routes.QUESTIONS}/${question.id}`);
  });
});
