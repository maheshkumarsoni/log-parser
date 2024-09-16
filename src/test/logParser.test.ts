import { parseLogFile } from '../logParser';

describe('Log Parser', () => {
  test('Should correctly parse log data', async () => {
    const logData = await parseLogFile('src/logs/testLog.log');
    expect(logData.get('/home')?.totalVisits).toBe(3);
    expect(logData.get('/home')?.uniqueIPs.size).toBe(2);
  });

  test('Should handle empty log file', async () => {
    const logData = await parseLogFile('src/logs/emptyLog.log');
    expect(logData.size).toBe(0);
  });
});
