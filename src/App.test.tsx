import { mount } from '@cypress/react';
import App from './App';

it('renders app', () => {
  mount(<App />);
  cy.get('.isr-report-main').should('be.visible');
});
