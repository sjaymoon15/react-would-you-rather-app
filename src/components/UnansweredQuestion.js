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
    const { question, author, handleSubmit } = this.props;
    return (
      <Card.Group data-test='component-unanswered-question'>
        <Card fluid>
          <Card.Content>
            <Card.Header data-test='unanswered-question-author'>
              {author.name} asks:
            </Card.Header>
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
                        data-test='unanswered-question-radio-option-one'
                        label={`${question.optionOne.text}`}
                        name='radioGroup'
                        value='optionOne'
                        checked={this.state.value === 'optionOne'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        data-test='unanswered-question-radio-option-two'
                        label={`${question.optionTwo.text}`}
                        name='radioGroup'
                        value='optionTwo'
                        checked={this.state.value === 'optionTwo'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Button
                      onClick={() =>
                        handleSubmit(question.id, this.state.value)
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
