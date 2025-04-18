module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',  // Mapeia @ para a raiz do projeto
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Configura o transformador para TS
  },
};
