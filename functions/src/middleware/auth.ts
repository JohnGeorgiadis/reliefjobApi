import { Request, Response, NextFunction } from "express"
import admin from 'firebase-admin'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization && req.headers.authorization.split('Bearer ').pop()
  const sessionCookie: string = req.cookies && req.cookies.__session

  if (!authHeader && !sessionCookie) {
    res.status(403).send('Unauthorized')
    return
  }

  const idToken: string = authHeader || sessionCookie

  try {
    req.user = await admin.auth().verifyIdToken(idToken);

    next();
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  }

  return
};
