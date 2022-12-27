import { ApplicationError } from "./utils/applicationError";

process.on('unhandledRejection', (reason: Error | any) => {
    console.log(`Unhandled Rejection: ${reason.message || reason}`);

    throw new ApplicationError('Unhandled Rejection:', reason.message || reason);
});

process.on('uncaughtException', (error: Error) => {
    console.log(`Uncaught Exception: ${error.message}`);

    throw new ApplicationError('Uncaught Exception', error);
});