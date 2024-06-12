// importing dependencies
import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

const customFormat = printf(({ timestamp, level, message }) => {
  let logMessage = `${timestamp} [${level}]: `;

  // also handle the message in case it's an object
  if (typeof message === "object") {
    logMessage += JSON.stringify(message, null, 2);
  } else {
    logMessage += message;
  }

  return logMessage;
});

export const logger = createLogger({
  level: "info", // default level
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "server.log" }),
  ],
});
