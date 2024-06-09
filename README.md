# Mirror Datatbase to Firestore


## TODO

- Support middle path of realtime database as subcollection of firestore.

## FROM_PATH

- You can put path like `posts/{category}`. Then, all the node data under key will be mirrored. For instance,
    - if `FROM_PATH` is `forum/{category}/{uid}/posts/{postid}` and `TO_PATH` is `posts`,
    - and the nodes of data to be mirrored are `/forum/cat1/uid1/posts/post1` and `/forum/cat2/uid2/posts/post2`,
    - then the result will be `/posts/post1`, `posts/post2`. Plus, the mirrored data will have `category`, `uid`, `postid` fields inside the data.


