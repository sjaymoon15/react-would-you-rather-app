import React, { Component } from 'react';
import { Card, Container, Input, Divider, Button } from 'semantic-ui-react';

class NewQuestionPage extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    optionOneError: '',
    optionTwoError: '',
  };

  handleSubmit() {}

  render() {
    return (
      <Container text>
        <Card fluid>
          <Card.Content textAlign='center'>
            <Card.Header>Creat New Question</Card.Header>
          </Card.Content>
          <Card.Content>
            <h5>Complete the question:</h5>
            <h3>Would you rather ...</h3>
            <Input fluid placeholder='Enter Option One Text Here' />
            <Divider horizontal>Or</Divider>
            <Input fluid placeholder='Enter Option Two Text Here' />
            <Divider horizontal></Divider>
            <Button
              onClick={() => this.handleSubmit()}
              fluid
              basic
              color='green'
            >
              Submit
            </Button>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

export default NewQuestionPage;
