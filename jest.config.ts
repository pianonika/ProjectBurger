export default {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\.(css|less|less)$': 'identity-obj-proxy',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@store/(.*)$': '<rootDir>/src/store/$1',
		'^@models/(.*)$': '<rootDir>/src/models/$1',
		'^@services/(.*)$': '<rootDir>/src/services/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
	globals: {
		fetch: global.fetch,
	},
};
