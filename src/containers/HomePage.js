import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { fetchQuestions, fetchUsers } from '../actions';

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchQuestions();
    this.props.fetchUsers();
  }
  render() {
    const { questions, users, questionsSorted } = this.props;

    if (!questions || !users || !questionsSorted) {
      return <Loader active inline='centered' />;
    }

    return <div>Home</div>;
  }
}
const mapStateToProps = (state) => {
  const { users, questions } = state;
  let questionsSorted = [];
  if (questions) {
    questionsSorted = Object.values(state.questions).sort(
      (a, b) => b.timestamp - a.timestamp
    );
  }

  console.log('questionsSorted', questionsSorted);
  return {
    users: state.users,
    questions: state.questions,
    questionsSorted,
  };
};

export default connect(mapStateToProps, { fetchQuestions, fetchUsers })(
  HomePage
);
