/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { mount } from '@cypress/react';
import App from './App';

it('renders app', () => {
  mount(<App />);
  cy.get('.isr-report-main').should('be.visible');
});
