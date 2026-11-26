export default {
  paths: ['features/**/*.feature'],
  import: ['steps/**/*.ts'],
  format: ['progress', 'allure-cucumberjs/reporter:artifacts/allure-formatter.log'],
  formatOptions: { resultsDir: process.env.ALLURE_RESULTS_DIR || 'allure-results' },
};
