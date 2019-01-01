# Backend Development README

To locally start the MongoDB, run

```
sudo mongod --dbpath /mongodb/data/db
```

In another terminal window, run

```
mongo
> use redux-hiking
> show collections
```

This starts `mongodb://localhost:27017/redux-hiking` server on `localhost:4000`