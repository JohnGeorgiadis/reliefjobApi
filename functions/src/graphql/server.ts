import express, { Request, Response } from "express";
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { auth } from "../middleware";
import * as bodyParser from 'body-parser'
import schema from './schema';
import resolvers from './resolvers';
import admin from 'firebase-admin'

function gqlServer() {
  const app = express();
  const jsonBodyParser = bodyParser.json()

  app.use(cors());

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground: true,
  });

  app.post(
    '/login',
    [jsonBodyParser],
    async (req: Request, res: Response) => {
      const { key } = req.body

      // todo: add this as secret, or consider checking this key with firebase auth if possible
      if (key !== 'keytounlocktruehappiness') {
        res.status(403).send('Unauthorized');
        return
      }

      try {
        let additionalClaims = {
          // leaving this here for reference
          premiumAccount: true
        };

        const token = await admin.auth().createCustomToken(key, additionalClaims)
        res.send({token})
      } catch (e) {
        console.error(e)
        res.status(403).send('Unauthorized');
      }
    }
  )

  app.use(auth)

  apolloServer.applyMiddleware({ app, path: '/', cors: true });

  return app;
}

export default gqlServer;
