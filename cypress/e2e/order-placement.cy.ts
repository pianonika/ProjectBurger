/// <reference types="cypress" />
import { cleanup } from '@testing-library/react';
import type {} from '../support/cypress';

describe('check burger-constructor', () => {
	const email = 'pianonika@gmail.com';
	const password = '123';
	// afterEach(() => cleanup());
	beforeEach(() => {
		cy.visit('/');

		cy.get('[data-testid=ingredients] [data-testid=ingredient-card]')
			.first()
			.as('firstBun');

		cy.get('[data-testid=cards-list]')
			.eq(2)
			.find(' [data-testid=ingredient-card]')
			.first()
			.as('firstFilling');

		cy.intercept('POST', 'api/auth/login', { fixture: 'user' });
		cy.intercept('POST', 'api/orders', { fixture: 'order' });
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

		window.localStorage.setItem(
			'refreshToken',
			JSON.stringify('test-refreshToken')
		);
		cy.setCookie('accessToken', 'test-refreshToken');
	});

	it('should open modal after click order button', function () {
		cy.get('[data-testid=login-btn]').click();
		cy.get('[data-testid=email_input]').type(`${email}`);
		cy.get('[data-testid=password_input]').type(`${password}`);
		cy.get('[data-testid=login-form_btn]').click();

		cy.dragTo('@firstBun');
		cy.dragTo('@firstFilling');
		cy.get('[data-testid=order-btn]').click();

		cy.get('[data-testId=modal]').should('exist');
		cy.get('[ data-testid=order-number]').should('have.text', '81666');
	});
});
