import React from 'react';
import { Card, Image, Grid, Divider } from 'semantic-ui-react';

const LeaderBoardCard = ({ score }) => {
  const { user } = score;
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Grid divided>
            <Grid.Row>
              <Grid.Column width={3}>
                <Image circular src={`${user.avatarURL}`} />
              </Grid.Column>
              <Grid.Column width={10}>
                <h2>{user.name}</h2>
                <Grid>
                  <Grid.Row>
                    <Grid.Column floated='left' width={14}>
                      <h4>Answered Questions</h4>
                    </Grid.Column>
                    <Grid.Column floated='right' width={2}>
                      <h4>{score.numAnswered}</h4>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider />
                <Grid>
                  <Grid.Row>
                    <Grid.Column floated='left' width={14}>
                      <h4>Created Questions</h4>
                    </Grid.Column>
                    <Grid.Column floated='right' width={2}>
                      <h4>{score.numCreated}</h4>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={3}>
                <Card>
                  <Card.Content textAlign='center' header='Score' />
                  <Card.Content textAlign='center' header={score.totalScore} />
                  {/* <Card.Content extra>
                    <Icon name='user' />4 Friends
                  </Card.Content> */}
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default LeaderBoardCard;
