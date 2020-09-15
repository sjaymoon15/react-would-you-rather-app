import React, { Component } from 'react';
import { fetchQuestions, fetchUsers, saveQeustionAnswer } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotFoundPage from '../containers/NotFoundPage';
import { Loader } from 'semantic-ui-react';
import UnansweredQuestion from '../components/UnansweredQuestion';

class PollDetailsPage extends Component {
  didUserAnswerQuestion(user, questionId) {
    return !!user.answers[questionId];
  }

  componentDidMount() {
    if (!this.props.questions) {
      this.props.fetchQuestions();
    }

    if (!this.props.users) {
      this.props.fetchUsers();
    }
  }

  handleSubmit = (qid, answer) => {
    // function _saveQuestionAnswer({ authedUser, qid, answer })
    console.log(this.props.authedUser, qid, answer);
    this.props.saveQeustionAnswer({
      authedUser: this.props.authedUser,
      qid,
      answer,
    });
  };

  render() {
    const { match, authedUser, users, questions, saveInProgress } = this.props;
    const questionId = match.params.question_id;

    if (!questions || !users || saveInProgress) {
      return <Loader active inline='centered' />;
    }

    if (!questions[questionId]) {
      return <NotFoundPage />;
    }

    const questionAnswered = this.didUserAnswerQuestion(
      users[authedUser],
      questionId
    );
    const question = questions[questionId];
    const author = users[question.author];

    if (questionAnswered) {
      return <div>answered</div>;
    } else {
      return (
        <UnansweredQuestion
          question={question}
          author={author}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { users, questions, auth, saveInProgress } = state;
  console.log('MSTP DETAIL', { users, questions, auth, saveInProgress });
  return {
    authedUser: auth.authedUser,
    users,
    questions,
    saveInProgress,
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchQuestions, fetchUsers, saveQeustionAnswer })(
    PollDetailsPage
  )
);
