export class Config {
    static fromPath: string = process.env.FROM_PATH || "mirror-from";
    static toPath: string = process.env.TO_PATH || "mirror-to";
    static fields: string[] = (process.env.FIELDS || "")
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f);
}