import { createLogger, transports, format } from "winston";
import { MongoDB } from 'winston-mongodb';
import configuration from "../config/configuration.js";

const { MONGODB_URI } = configuration.database;

export const logger = createLogger({
    level: "silly",

    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint(),
    ),
    transports: [
        new transports.Console(),
        new transports.MongoDB({
            level: "silly",
            db: MONGODB_URI,
            collection: "silly",
            options: { useUnifiedTopology: true }
        })
    ],
    exceptionHandlers:[new transports.File({filename:"src/logs/exceptions.log"})],
    rejectionHandlers: [new transports.File({ filename: "src/logs/rejections.log" })],
})
