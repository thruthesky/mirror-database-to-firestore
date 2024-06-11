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
    },
    {
        source: "comments/{postId}/{commentId}",
        destination: "comments",
    },
];
//# sourceMappingURL=config.js.map