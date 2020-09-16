import React from 'react';
import { Card, Button, Image, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const Question = ({ question, users }) => {
  const author = users[question.author];
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{author.name} asks:</Card.Header>
      </Card.Content>
      <Card.Content>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image circular src={`${author.avatarURL}`} />
            </Grid.Column>
            <Grid.Column width={13}>
              <Header as='h3'>Would you rather</Header>
              <Header as='h4'>...{question.optionOne.text}</Header>
              <Button
                as={Link}
                fluid
                basic
                color='green'
                to={`${routes.QUESTIONS}/${question.id}`}
              >
                View Poll
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default Question;
