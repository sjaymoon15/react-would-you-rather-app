import * as routes from '../../src/constants/routes';
import { signIn } from './helper/helper';
import { AUTH_COOKIE, baseUrl } from '../../src/constants/variables';

describe('The Navbar', () => {
  beforeEach(() => {
    signIn();
    cy.visit(routes.HOME);
  });

  it('navigates to New Question Page', () => {
    cy.get(`a[href="${routes.NEW_QUESTION}"]`).click();
    cy.url().should('eq', `${baseUrl}${routes.NEW_QUESTION}`);
  });

  it('navigates to Leader Board Page', () => {
    cy.get(`a[href="${routes.LEADER_BOARD}"]`).click();
    cy.url().should('eq', `${baseUrl}${routes.LEADER_BOARD}`);
  });

  it('navigates back to Home Page', () => {
    cy.get(`a[href="${routes.LEADER_BOARD}"]`).click();
    cy.get(`a[href="${routes.HOME}"]`).click();
    cy.url().should('eq', `${baseUrl}${routes.HOME}`);
  });

  it('logs out user on clicking Logout link', () => {
    cy.contains('Logout').click();
    cy.url().should('eq', `${baseUrl}${routes.SIGN_IN}`);
    cy.getCookie(AUTH_COOKIE).should('not.exist');
  });
});
