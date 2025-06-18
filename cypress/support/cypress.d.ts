import './commands';
declare global {
	namespace Cypress {
		interface Chainable {
			dragTo(elemAttr: string): void;

			// drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
		}
	}
}
