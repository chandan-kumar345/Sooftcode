// Centralized structured logging utility
const colors = {
  reset: '\x1b[0m',
  info: '\x1b[36m',     // Cyan
  warn: '\x1b[33m',     // Yellow
  error: '\x1b[31m',    // Red
  security: '\x1b[35m', // Magenta
  debug: '\x1b[90m',    // Gray
};

const formatMessage = (level, message, meta) => {
  const timestamp = new Date().toISOString();
  const color = colors[level] || colors.reset;
  const metaStr = meta && Object.keys(meta).length ? ` | Meta: ${JSON.stringify(meta)}` : '';
  return `${color}[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}${colors.reset}`;
};

const logger = {
  info: (message, meta) => console.log(formatMessage('info', message, meta)),
  warn: (message, meta) => console.warn(formatMessage('warn', message, meta)),
  error: (message, meta) => console.error(formatMessage('error', message, meta)),
  security: (message, meta) => console.log(formatMessage('security', message, meta)),
  debug: (message, meta) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(formatMessage('debug', message, meta));
    }
  }
};

export default logger;
