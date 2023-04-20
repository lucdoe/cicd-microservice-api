export const sonarQubeScanner = {
    serverUrl: 'https://your-sonarqube-server.com',
    token: 'YOUR_SONARQUBE_ACCESS_TOKEN',
    options: {
        'sonar.sources': 'src',
        'sonar.tests': 'test',
        'sonar.inclusions': '**',
        'sonar.test.inclusions': 'test/**/*.test.ts',
        'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
        'sonar.testExecutionReportPaths': 'reports/test-report.xml',
    },
};
