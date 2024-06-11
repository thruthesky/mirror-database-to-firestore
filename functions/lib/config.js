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
        source: "depth-2/{id}",
        destination: "mirror-to",
    },
    {
        source: "depth-3/{a}/{id}",
        destination: "mirror-to",
        fields: ["name", "age", "timestamp", "author", "content", "title", "category", "uid", "postId"],
    },
    {
        source: "depth-4/{a}/{b}/{id}",
        destination: "mirror-to",
    },
    {
        source: "depth-5/forum/{category}/{uid}/{id}",
        destination: "mirror-to",
    },
    {
        source: "depth-6/forum/{category}/{uid}/posts/{id}",
        destination: "new-mirror-to",
        fields: ["title", "content", "author", "timestamp"],
    },
];
//# sourceMappingURL=config.js.map