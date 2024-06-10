"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
/**
 * Configuration for the mirror function.
 */
class Config {
}
exports.Config = Config;
Config.fromPath = process.env.FROM_PATH || "mirror-from/{category}/{post}";
Config.toPath = process.env.TO_PATH || "mirror-to";
Config.fields = (process.env.FIELDS || "")
    .split(",")
    .map((f) => f.trim())
    .filter((f) => f);
//# sourceMappingURL=config.js.map