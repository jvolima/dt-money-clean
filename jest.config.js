module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/styles/**/*',
    '!<rootDir>/src/presentation/App.tsx',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!<rootDir>/src/presentation/pages/error/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$': '<rootDir>/fileMock.js'
  }
}
