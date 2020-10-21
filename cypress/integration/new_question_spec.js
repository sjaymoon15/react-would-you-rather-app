import * as routes from '../../src/constants/routes';
import { signIn } from './helper/helper';
import { baseUrl } from '../../src/constants/variables';

describe('The New Question Page', () => {
  const optionOneText = 'option one text example';
  const optionTwoText = 'option two text example';
  before(() => {
    signIn();
  });

  it('successfully loads', () => {
    cy.visit(routes.NEW_QUESTION);
  });

  it('types option one text', () => {
    cy.get('#option-one').type(optionOneText);
  });

  it('types option two text', () => {
    cy.get('#option-two').type(optionTwoText);
  });

  it('submits a new question and navigates to Home page', () => {
    cy.get('#new-question-submit-button').click();
    cy.url().should('eq', `${baseUrl}${routes.HOME}`);
  });

  it('newly created question shows up in home page', () => {
    cy.contains(optionOneText);
  });
});
