import React, { Component } from 'react';
import {
  Card,
  Button,
  Image,
  Grid,
  Header,
  Form,
  Radio,
} from 'semantic-ui-react';

class UnansweredQuestion extends Component {
  state = {};
  handleChange = (e, { value }) => {
    this.setState({ value });
  };

  render() {
    const { question, author } = this.props;
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
                  <Header as='h2'>Would you rather</Header>
                  <Form>
                    <Form.Field>
                      <Radio
                        label={`${question.optionOne.text}`}
                        name='radioGroup'
                        value='optionOne'
                        checked={this.state.value === 'optionOne'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label={`${question.optionTwo.text}`}
                        name='radioGroup'
                        value='optionTwo'
                        checked={this.state.value === 'optionTwo'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Button
                      onClick={() =>
                        this.props.handleSubmit(question.id, this.state.value)
                      }
                      fluid
                      basic
                      color='green'
                    >
                      Submit
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default UnansweredQuestion;
