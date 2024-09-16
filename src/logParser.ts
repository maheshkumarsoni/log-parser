import * as fs from 'fs';
import * as readline from 'readline';

interface ILogData {
  totalVisits: number;
  uniqueIPs: Set<string>;
}

export const parseLogFile = (
  filePath: string
): Promise<Map<string, ILogData>> => {
  return new Promise((resolve, reject) => {
    const logDataMap: Map<string, ILogData> = new Map();

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    rl.on('line', (line: string) => {
      const [url, ip] = line.split(' ');

      if (!logDataMap.has(url)) {
        logDataMap.set(url, { totalVisits: 0, uniqueIPs: new Set() });
      }

      const logData = logDataMap.get(url)!;
      logData.totalVisits++;
      logData.uniqueIPs.add(ip);
    });

    rl.on('close', () => {
      resolve(logDataMap);
    });

    // Reject if input stream is stopped or interrupted!
    rl.on('SIGTSTP', (err: unknown) => {
      reject(err);
    });
  });
};

const displayResults = (logDataMap: Map<string, ILogData>) => {
  // Sort and display total visits
  const sortedByVisits = Array.from(logDataMap.entries()).sort(
    (a, b) => b[1].totalVisits - a[1].totalVisits
  );
  console.log('Most Page Views:');
  sortedByVisits.forEach(([url, data]) => {
    console.log(`${url} ${data.totalVisits} visits`);
  });

  // Sort and display unique views
  const sortedByUniqueViews = Array.from(logDataMap.entries()).sort(
    (a, b) => b[1].uniqueIPs.size - a[1].uniqueIPs.size
  );
  console.log('\nMost Unique Page Views:');
  sortedByUniqueViews.forEach(([url, data]) => {
    console.log(`${url} ${data.uniqueIPs.size} unique views`);
  });
};

const logParser = async () => {
  console.log('******* Log Parser Script Started *******');

  const filePath = 'src/logs/web.log'; // Path to your log file
  try {
    const logDataMap = await parseLogFile(filePath);
    displayResults(logDataMap);
  } catch (error) {
    console.error('Error processing log file:', error);
  }
};

logParser();
