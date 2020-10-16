import * as routes from '../../../src/constants/routes';

export const signIn = () => {
  cy.visit(routes.SIGN_IN);
  cy.get('div[role="listbox"]').click();
  cy.get('div[role="option"]').first().click();
  const signInButton = cy.get('button');
  signInButton.contains('Sign In');
  signInButton.click();
};
