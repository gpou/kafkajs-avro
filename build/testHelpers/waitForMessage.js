"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const waitFor_1 = require("./waitFor");
exports.default = async ({ consumer, matches, timeout = 10000 }) => {
    let matchingMessage;
    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (matches({ topic, partition, message })) {
                matchingMessage = message;
            }
        }
    });
    return waitFor_1.default(async (duration) => {
        if (duration > timeout) {
            throw new Error("Timeout waiting for message");
        }
        return matchingMessage != null;
    });
};
//# sourceMappingURL=waitForMessage.js.map