# Mirror Datatbase to Firestore

This cloud function mirrors data from realtime database to firestore database. If you need to copy(or sync) data from realtime database to firestore, this extesion will do.



## Install


- Update `config.ts` for your need and deploy.

- `Config.paths` is an array of `ConfigPath` type which has;
    - `source` - where the data come from and to watch the changes; It can be `a/{b}/{c}/{d}` to observe the path.
    - `destination` is where the data is written to
    - `fields` is the fields that you can copy. if it's empty it will copy all the fields.

Example of path setting

```ts
    {
      source: "depth-6/forum/{category}/{uid}/posts/{id}",
      destination: "new-mirror-to",
      fields: ["title", "content", "author", "timestamp"],
    },
```

