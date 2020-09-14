import React from 'react';
import { Card, Button, Image, Grid, Header } from 'semantic-ui-react';

const Question = ({ question, users }) => {
  const author = users[question.author];
  return (
    <Card.Group>
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
                <Button fluid basic color='green'>
                  View Poll
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default Question;
