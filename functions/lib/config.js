"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
/**
 * Configuration for the mirror function.
 */
class Config {
}
exports.Config = Config;
/**
 * Region to deploy the function.
 */
Config.region = "us-central1"; // asia-southeast1
/**
   * Paths to mirror.
   */
Config.paths = [
    {
        source: "users/{uid}",
        destination: "users",
    },
    {
        source: "posts/{category}/{postId}",
        destination: "posts",
        // fields: ["name", "timestamp"],
    },
    {
        source: "comments/{postId}/{commentId}",
        destination: "comments",
    },
];
//# sourceMappingURL=config.js.map