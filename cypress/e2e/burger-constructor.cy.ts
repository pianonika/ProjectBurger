/// <reference types="cypress" />
import { cleanup } from '@testing-library/react';

describe('check burger-constructor', () => {
	afterEach(() => cleanup());
	beforeEach(() => {
		cy.visit('http://localhost:8080');
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
	});
	// beforeEach(() => {
	// 	cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
	// 	cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
	// 		'postOrder'
	// 	);
	//
	// 	window.localStorage.setItem(
	// 		'refreshToken',
	// 		JSON.stringify('test-refreshToken')
	// 	);
	// 	cy.setCookie('accessToken', 'test-refreshToken');
	// });

	it('should open modal page by click with ingredient data', function () {
		cy.get('[data-testid=ingredients] [data-testid=ingredient-card]')
			.first()
			.click();

		cy.get('[data-testId=ingredient-modal-title]').should(
			'have.text',
			'1111Краторная булка N-200i'
		);
	});

	it('should close modal page by click on close btn', function () {
		cy.get('[data-testid=ingredients] [data-testid=ingredient-card]')
			.first()
			.click();

		cy.get('[data-testid=close-modal]').click();

		cy.get('[data-testId=modal]').should('not.exist');
	});

	it('should do d-n-d with bun', function () {
		cy.get('[data-testid=ingredients] [data-testid=ingredient-card]')
			.first()
			.trigger('dragstart');
		cy.wait(500);
		cy.get('[data-testid=drop-container]').trigger('drop');
		cy.wait(500);
		cy.get('[data-testid=constructor-element-bun]').first().should('exist');
	});

	it('should do d-n-d with fillings', function () {
		cy.get('[data-testid=cards-list]')
			.eq(2)
			.find(' [data-testid=ingredient-card]')
			.first()
			.trigger('dragstart');
		cy.wait(500);
		cy.get('[data-testid=drop-container]').trigger('drop');
		cy.wait(500);
		cy.get('[data-testid=constructor-element-filling]').first().should('exist');
	});
});
