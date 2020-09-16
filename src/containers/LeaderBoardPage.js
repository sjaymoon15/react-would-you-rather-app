import React, { Component } from 'react';
import { fetchQuestions, fetchUsers } from '../actions';
import { connect } from 'react-redux';
import { Loader, Container } from 'semantic-ui-react';
import LeaderBoardCard from '../components/LeaderBoardCard';

class LeaderBoardPage extends Component {
  componentDidMount() {
    if (!this.props.users) {
      this.props.fetchUsers();
    }
  }

  render() {
    const { scores } = this.props;

    if (!scores) {
      return <Loader active inline='centered' />;
    }
    return (
      <Container text>
        {scores.map((score) => (
          <LeaderBoardCard key={score.user.id} score={score} />
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { users } = state;
  let scores = [];
  if (users) {
    scores = Object.values(users).map((user) => {
      const numAnswered = Object.values(user.answers).length;
      const numCreated = user.questions.length;
      return {
        user,
        numAnswered,
        numCreated,
        totalScore: numAnswered + numCreated,
      };
    });
  }
  return {
    scores: scores.sort((a, b) => b.totalScore - a.totalScore),
  };
};

export default connect(mapStateToProps, { fetchQuestions, fetchUsers })(
  LeaderBoardPage
);
