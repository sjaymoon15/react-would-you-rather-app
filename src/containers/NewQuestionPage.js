import React, { Component } from 'react';
import {
  Card,
  Container,
  Divider,
  Button,
  Form,
  Loader,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveQuestion } from '../actions';
import { withRouter } from 'react-router-dom';

class NewQuestionPage extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    optionOneError: false,
    optionTwoError: false,
  };

  handleSubmit = (event, data) => {
    if (!this.state.optionOneText) {
      this.setState({
        optionOneError: true,
      });
    } else {
      this.setState({
        optionOneError: false,
      });
    }

    if (!this.state.optionTwoText) {
      this.setState({
        optionTwoError: true,
      });
    } else {
      this.setState({
        optionTwoError: false,
      });
    }

    const { optionOneText, optionTwoText } = this.state;
    const { saveQuestion, author, history } = this.props;

    if (optionOneText && optionTwoText && saveQuestion && author) {
      saveQuestion(
        {
          optionOneText,
          optionTwoText,
          author,
        },
        history
      );
    }
  };

  handleInputChange = (e, option) => {
    if (option === 'optionOne') {
      this.setState({
        optionOneText: e.target.value,
      });
    } else {
      this.setState({
        optionTwoText: e.target.value,
      });
    }
  };

  render() {
    if (this.props.saveInProgress) {
      return <Loader active inline='centered' />;
    }
    return (
      <Container text>
        <Card fluid>
          <Card.Content textAlign='center'>
            <Card.Header>Creat New Question</Card.Header>
          </Card.Content>
          <Card.Content>
            <h5>Complete the question:</h5>
            <h3>Would you rather ...</h3>

            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                fluid
                placeholder='Enter Option One Text Here'
                value={this.state.optionOneText}
                onChange={(e) => this.handleInputChange(e, 'optionOne')}
                error={this.state.optionOneError}
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                fluid
                placeholder='Enter Option Two Text Here'
                value={this.state.optionTwoText}
                onChange={(e) => this.handleInputChange(e, 'optionTwo')}
                error={this.state.optionTwoError}
              />

              <Button type='submit' fluid basic color='green'>
                Submit
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { saveInProgress, auth } = state;
  return { saveInProgress, author: auth.authedUser };
};

export default withRouter(
  connect(mapStateToProps, { saveQuestion })(NewQuestionPage)
);
