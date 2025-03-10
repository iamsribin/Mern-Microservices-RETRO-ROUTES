import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export default {
  createToken: async (clientId: ObjectId, expire: string) => {
    const jwtSecretKey = process.env.JWT_SECRET ?? "Sribin";
    const token = jwt.sign({ clientId }, jwtSecretKey, {
      expiresIn: expire as SignOptions["expiresIn"],
    });

    return token;
  },
};
