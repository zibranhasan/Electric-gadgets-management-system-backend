import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/Auth/auth.interface";
import config from "../config";
import httpStatus from "http-status";

interface CustomRequest<T> extends Request {
  user?: T;
}

const auth = (...requiredRoles: TUserRole[]) => {
  return async <T>(
    req: CustomRequest<T>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized!");
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
      const { role } = decoded;

      if (requiredRoles && !requiredRoles.includes(role as TUserRole)) {
        throw new Error("You are not authorized");
      }

      req.user = decoded as T;

      next();
    } catch (error: any) {
      console.error(`Authentication error: ${error.message}`);
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Authentication failed" });
    }
  };
};

export default auth;
