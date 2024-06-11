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
    },
    {
      source: "comments/{postId}/{commentId}",
      destination: "comments",
    },
  ];
}

