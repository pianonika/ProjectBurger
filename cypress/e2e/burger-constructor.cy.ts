/// <reference types="cypress" />
import { cleanup } from '@testing-library/react';
import type {} from '../support/cypress';

describe('check burger-constructor', () => {
	afterEach(() => cleanup());
	beforeEach(() => {
		cy.visit('');
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
		cy.get('[data-testid=ingredients] [data-testid=ingredient-card]')
			.first()
			.as('firstBun');

		cy.get('[data-testid=cards-list]')
			.eq(2)
			.find(' [data-testid=ingredient-card]')
			.first()
			.as('firstFilling');
	});

	it('should open modal page by click with ingredient data', function () {
		cy.get('@firstBun').first().click();

		cy.get('[data-testId=ingredient-modal-title]').should(
			'have.text',
			'1111Краторная булка N-200i'
		);
	});

	it('should close modal page by click on close btn', function () {
		cy.get('@firstBun').click();

		cy.get('[data-testid=close-modal]').click();

		cy.get('[data-testId=modal]').should('not.exist');
	});

	it('should do d-n-d with bun', function () {
		cy.dragTo('@firstBun');
		cy.get('[data-testid=constructor-element-bun]').first().should('exist');
	});

	it('should do d-n-d with fillings', function () {
		cy.dragTo('@firstFilling');
		cy.get('[data-testid=constructor-element-filling]').first().should('exist');
	});
});
