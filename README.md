# Mirror Datatbase to Firestore

This cloud function mirrors data from realtime database to firestore database. If you need to copy(or sync) data from realtime database to firestore, this extesion will do.



## Install


- Update `src/config.ts` for your need and deploy.

- `region` is the region of the realtime database. It must be the same region of realtime database or it will produce error while deploying.

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

- The parameters of the path will be saved into the document automatically.
    - For instance, the path is `a/{b}/{c}`
    - And if the value of the b is banana, and the value of the c is cherry,
    - then the result will be `{ b: banana, c: cherry, ...and-other-values...}`




- Run `npm run deploy` to deploy the functions


## Backfill

- To backfill, run `npm run backfill` and it will copy all the data from database to the firestore based on the Config settings.

