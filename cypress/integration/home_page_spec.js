import * as routes from '../../src/constants/routes';
import { baseUrl } from '../../src/constants/variables';
import { signIn } from './helper/helper';

describe('The Home Page', () => {
  before(() => {
    signIn();
  });

  it('successfully loads', () => {
    cy.visit(routes.HOME);
  });

  it('shows default active tab: Unanswered Questions', () => {
    const unansweredQuestionTab = cy.get(
      'div.ui.attached.tabular.menu a:first'
    );
    unansweredQuestionTab.should('have.class', 'active');
    unansweredQuestionTab.contains('Unanswered Questions');
  });

  it('clicks Answered Questions tab', () => {
    const answeredQuestionTab = cy.get(
      'div.ui.attached.tabular.menu a:nth-child(2)'
    );
    answeredQuestionTab.should('not.have.class', 'active');
    answeredQuestionTab.click();
    answeredQuestionTab.should('have.class', 'active');
  });

  it('clicks one poll and navigates to Poll Details Page', () => {
    cy.get('a.ui.green.button').first().click();
    cy.url().should('include', `${baseUrl}${routes.QUESTIONS}`);
  });
});
