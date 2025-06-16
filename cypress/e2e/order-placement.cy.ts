/// <reference types="cypress" />
import { cleanup } from '@testing-library/react';

describe('check burger-constructor', () => {
	const email = 'pianonika@gmail.com';
	const password = '123';
	afterEach(() => cleanup());
	beforeEach(() => {
		cy.visit('http://localhost:8080');

		cy.intercept('GET', 'api/auth/login', { fixture: 'user.json' });
		cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

		window.localStorage.setItem(
			'refreshToken',
			JSON.stringify('test-refreshToken')
		);
		cy.setCookie('accessToken', 'test-refreshToken');
	});
	// beforeEach(() => {
	// 	cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
	// 	cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
	// 		'postOrder'
	// 	);
	//
	// });

	it('should open modal after click order button', function () {
		cy.get('[data-testid=login-btn]').click();
		cy.get('[data-testid=email_input]').type(`${email}`);
		cy.get('[data-testid=password_input]').type(`${password}{enter}`);

		cy.get('[data-testid=ingredients] [data-testid=ingredient-card]')
			.first()
			.trigger('dragstart');

		cy.get('[data-testid=drop-container]').trigger('drop');
		cy.wait(500);
		cy.get('[data-testid=cards-list]')
			.eq(2)
			.find(' [data-testid=ingredient-card]')
			.first()
			.trigger('dragstart');

		cy.get('[data-testid=drop-container]').trigger('drop');
		cy.wait(500);
		cy.get('[data-testid=order-btn]').click();

		cy.get('[data-testId=modal]').should('exist');
		cy.get('[ data-testid=order-number]').should('have.text', '81666');

	});
});
