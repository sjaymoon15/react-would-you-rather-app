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
    const activeTabAnchor = cy.get('div.ui.attached.tabular.menu a:first');
    activeTabAnchor.should('have.class', 'active');
    activeTabAnchor.contains('Unanswered Questions');
  });

  it('clicks Answered Questions tab', () => {
    const activeTabAnchor = cy.get(
      'div.ui.attached.tabular.menu a:nth-child(2)'
    );
    activeTabAnchor.should('not.have.class', 'active');
    activeTabAnchor.click();
    activeTabAnchor.should('have.class', 'active');
  });

  it('clicks one poll and navigates to Poll Details Page', () => {
    cy.get('a.ui.green.button').first().click();
    cy.url().should('include', `${baseUrl}${routes.QUESTIONS}`);
  });
});
