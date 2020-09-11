import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Tab } from 'semantic-ui-react';
import { fetchQuestions, fetchUsers } from '../actions';
import Question from '../components/Question';

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchQuestions();
    this.props.fetchUsers();
  }
  render() {
    const {
      questions,
      users,
      unansweredQuestions,
      answeredQuestions,
    } = this.props;

    if (!questions || !users || !unansweredQuestions || !answeredQuestions) {
      return <Loader active inline='centered' />;
    }

    return (
      <Tab panes={formatPanes({ unansweredQuestions, answeredQuestions })} />
    );
  }
}

const formatPanes = ({ unansweredQuestions, answeredQuestions }) => {
  return [
    {
      menuItem: 'Unanswered Questions',
      render: () => (
        <Tab.Pane>
          {unansweredQuestions.map((question) => (
            <Question question={question} />
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Answered Questions',
      render: () => (
        <Tab.Pane>
          {answeredQuestions.map((question) => (
            <Question question={question} />
          ))}
        </Tab.Pane>
      ),
    },
  ];
};

const mapStateToProps = (state) => {
  const { users, questions, auth } = state;
  let unansweredQuestions = [];
  let answeredQuestions = [];
  if (questions && users && auth?.authedUser) {
    const questionsArr = Object.values(state.questions).sort(
      (a, b) => b.timestamp - a.timestamp
    );
    questionsArr.forEach((question) => {
      if (users[auth.authedUser].answers[question.id]) {
        answeredQuestions.push(question);
      } else {
        unansweredQuestions.push(question);
      }
    });
  }

  console.log('state Home page', {
    users,
    questions,
    unansweredQuestions,
    answeredQuestions,
  });
  return {
    users,
    questions,
    unansweredQuestions,
    answeredQuestions,
  };
};

export default connect(mapStateToProps, { fetchQuestions, fetchUsers })(
  HomePage
);
