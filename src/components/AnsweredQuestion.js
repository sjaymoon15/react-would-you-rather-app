import React from 'react';
import { Card, Image, Grid, Header, Progress } from 'semantic-ui-react';

const AnsweredQuestion = ({ question, author, authedUser }) => {
  const {
    optionOneCount,
    optionTwoCount,
    sumCounts,
    optionOneRatio,
    optionTwoRatio,
  } = getQuestionOptionsInfo(question);

  return (
    <Card.Group data-test='component-answered-question'>
      <Card fluid>
        <Card.Content>
          <Card.Header data-test='answered-question-asked-by-header'>Asked by {author.name}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Grid divided>
            <Grid.Row>
              <Grid.Column width={3}>
                <Image circular src={`${author.avatarURL}`} />
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h2'>Results</Header>
                <Card
                  fluid
                  color={setColorBasedOnAnswer(question.optionOne, authedUser)}
                >
                  <Card.Content>
                    <Card.Header as='h3' data-test='answered-question-option-one'>
                      Would you rather {question.optionOne.text}
                    </Card.Header>
                    <Progress
                      percent={optionOneRatio}
                      progress
                      color={setColorBasedOnAnswer(
                        question.optionOne,
                        authedUser
                      )}
                    />
                    <Card.Header as='h4' textAlign='center'>
                      {`${optionOneCount} out of ${sumCounts} votes`}
                    </Card.Header>
                    {question.optionOne.votes.includes(authedUser) && (
                      <Card.Content extra textAlign='right'>
                        Your Answer
                      </Card.Content>
                    )}
                  </Card.Content>
                </Card>
                <Card
                  fluid
                  color={setColorBasedOnAnswer(question.optionTwo, authedUser)}
                >
                  <Card.Content>
                    <Card.Header as='h3' data-test='answered-question-option-two'>
                      Would you rather {question.optionTwo.text}
                    </Card.Header>
                    <Progress
                      percent={optionTwoRatio}
                      progress
                      color={setColorBasedOnAnswer(
                        question.optionTwo,
                        authedUser
                      )}
                    />
                    <Card.Header as='h4' textAlign='center'>
                      {`${optionTwoCount} out of ${sumCounts} votes`}
                    </Card.Header>
                    {question.optionTwo.votes.includes(authedUser) && (
                      <Card.Content extra textAlign='right'>
                        Your Answer
                      </Card.Content>
                    )}
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export const setColorBasedOnAnswer = (option, authedUser) => {
  return option.votes.includes(authedUser) ? 'green' : 'yellow';
};

export const getQuestionOptionsInfo = (question) => {
  const optionOneCount = question.optionOne.votes.length;
  const optionTwoCount = question.optionTwo.votes.length;
  const sumCounts = optionOneCount + optionTwoCount;
  const optionOneRatio = Math.round((optionOneCount / sumCounts) * 100);
  const optionTwoRatio = Math.round((optionTwoCount / sumCounts) * 100);

  return {
    optionOneCount,
    optionTwoCount,
    sumCounts,
    optionOneRatio,
    optionTwoRatio,
  };
};

export default AnsweredQuestion;
