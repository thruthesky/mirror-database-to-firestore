export interface ConfigPath {
  source: string;
  destination: string;
  fields?: Array<string>;
}

/**
 * Configuration for the mirror function.
 */
export class Config {
  /**
   * Region to deploy the function.
   */
  public static region = "asia-southeast1"; // asia-southeast1 | us-central1
  /**
   * Paths to mirror.
   */
  public static paths: Array<ConfigPath> = [
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
}
