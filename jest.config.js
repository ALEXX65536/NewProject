module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/tests/**/*.test.{js,jsx}'], 
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(sass|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  rootDir: process.cwd(),
};