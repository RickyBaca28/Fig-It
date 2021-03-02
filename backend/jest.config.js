module.exports = {
    rootDir: './',
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
    testPathIgnorePatterns: ['../__tests__/utils/*'],
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  }