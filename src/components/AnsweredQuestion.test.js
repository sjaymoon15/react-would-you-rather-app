import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../utils/testUtils';
import AnsweredQuestion, { setColorBasedOnAnswer, getQuestionOptionsInfo } from './AnsweredQuestion';
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
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  })

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-answered-question');
    expect(component.length).toBe(1);
  });

  it('renders correct header', () => {
    const component = findByTestAttr(wrapper, 'answered-question-asked-by-header').dive();
    const author = defaultProps.author;
    expect(component.text()).toBe(`Asked by ${author.name}`);
  })

  it('renders option one text', () => {
    const component = findByTestAttr(wrapper, 'answered-question-option-one').dive();
    const question = defaultProps.question;
    expect(component.text()).toBe(`Would you rather ${question.optionOne.text}`)
  })

  it('renders option two text', () => {
    const component = findByTestAttr(wrapper, 'answered-question-option-two').dive();
    const question = defaultProps.question;
    expect(component.text()).toBe(`Would you rather ${question.optionTwo.text}`)
  })
});

describe('setColorBasedOnAnswer', () => {
  it('sets color based on answer', () => {
    const question = {
      id: 'vthrdm985a262al8qx3do',
      author: 'tylermcginnis',
      timestamp: 1489579767190,
      optionOne: {
        votes: ['tylermcginnis'],
        text: 'find $50 yourself',
      },
      optionTwo: {
        votes: ['johndoe'],
        text: 'have your best friend find $500',
      },
    }

    const authedUser = 'johndoe';

    const optionOneResult = setColorBasedOnAnswer(question.optionOne, authedUser);
    const optionTwoResult = setColorBasedOnAnswer(question.optionTwo, authedUser);
    
    expect(optionOneResult).toBe('yellow');
    expect(optionTwoResult).toBe('green');
  });
});

describe('getQuestionOptionsInfo', () => {
  it('calculates and returns optionOneCount, optionTwoCount, sumCounts, optionOneRatio, optionTwoRatio', () => {
    const question = {
      id: 'vthrdm985a262al8qx3do',
      author: 'tylermcginnis',
      timestamp: 1489579767190,
      optionOne: {
        votes: ['tylermcginnis', 'sarahedo'],
        text: 'find $50 yourself',
      },
      optionTwo: {
        votes: ['johndoe'],
        text: 'have your best friend find $500',
      },
    }

    const {
      optionOneCount,
      optionTwoCount,
      sumCounts,
      optionOneRatio,
      optionTwoRatio,
    } = getQuestionOptionsInfo(question);  
    
    expect(optionOneCount).toBe(2);
    expect(optionTwoCount).toBe(1);
    expect(sumCounts).toBe(3);
    expect(optionOneRatio).toBe(67);
    expect(optionTwoRatio).toBe(33);
  });
});



