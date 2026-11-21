const fs = require('fs');
const path = require('path');
const report = path.resolve('reports/cucumber-report.html');
if (!fs.existsSync(report)) {
  console.error('Cucumber report not found. Run npm run test:e2e first.');
  process.exit(1);
}
console.log(`Report created at: ${report}`);
console.log('Open this file in your browser to review the Cucumber results.');
