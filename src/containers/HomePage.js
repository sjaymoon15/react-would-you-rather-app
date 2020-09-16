import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Tab, Container } from 'semantic-ui-react';
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
      <Container text>
        <Tab
          panes={formatPanes({ unansweredQuestions, answeredQuestions, users })}
        />
      </Container>
    );
  }
}

const formatPanes = ({ unansweredQuestions, answeredQuestions, users }) => {
  return [
    {
      menuItem: 'Unanswered Questions',
      render: () => (
        <Tab.Pane>
          {unansweredQuestions.map((question) => (
            <Question key={question.id} question={question} users={users} />
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Answered Questions',
      render: () => (
        <Tab.Pane>
          {answeredQuestions.map((question) => (
            <Question key={question.id} question={question} users={users} />
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
