import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import path from 'path';

import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import './utils/db';
import schema from './schema';


dotenv.config();

const app = express();

const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/graphql'   
});

server.applyMiddleware({
    app,
    path: '/graphql',
    cors: true,
    onHealthCheck: () =>
        // eslint-disable-next-line no-undef
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0)
                return resolve();
            else
                return reject();
        }),
});

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
      //cb(null,  'menos-dor-mais-amor-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
});



app.listen({ port: process.env.PORT }, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    console.log(`Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});