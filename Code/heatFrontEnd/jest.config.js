module.exports = {
    // // Specify the test environment
    // testEnvironment: 'jsdom',
  
    // // Specify the file extensions Jest should consider
    // moduleFileExtensions: ['js', 'jsx'],
  
    // // Configure the test regex pattern
    // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?)$',
  
    // Specify the Babel transformer for JSX and JavaScript files
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
  };
  