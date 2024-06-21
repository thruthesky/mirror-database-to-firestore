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
  public static region = "us-central1"; // asia-southeast1
  /**
     * Paths to mirror.
     */
  public static paths: Array<ConfigPath> = [
    {
      source: "admins/{uid}",
      destination: "admins",
    },
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

