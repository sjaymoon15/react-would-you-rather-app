import * as routes from '../../src/constants/routes';
import { AUTH_COOKIE, baseUrl } from '../../src/constants/variables';

describe('The Sign In Page', () => {
  it('successfully loads', () => {
    cy.visit(routes.SIGN_IN);
  });

  it('selects one user from dropdown', () => {
    cy.get('div[role="listbox"]').click();
    cy.get('div[role="option"]').first().click();
  });

  it('clicks sign in button and saves a cookie', () => {
    const signInButton = cy.get('button');
    signInButton.contains('Sign In');
    signInButton.click();
    cy.getCookie(AUTH_COOKIE).should('exist');
  });
  it('navigates to home page', () => {
    cy.url().should('eq', `${baseUrl}${routes.HOME}`);
  });
});
