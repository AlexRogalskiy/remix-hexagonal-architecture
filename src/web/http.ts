import Joi from "joi";
import { getSession, isAuthenticatedSession } from "./sessions";
import { redirect } from "remix";

const formatErrors = (error: Joi.ValidationError) => {
  const errors: Record<string, string> = {};

  error.details.forEach((detail) => {
    errors[detail.context?.key!] = detail.message;
  });

  return errors;
};

export const requireAuthentication = async (request: Request) => {
  const session = await sessionFromCookies(request);

  if (!isAuthenticatedSession(session)) throw redirect("/login");
};

export const header = (headerName: string, request: Request) =>
  request.headers.get(headerName);

export const sessionFromCookies = (request: Request) =>
  getSession(header("Cookie", request));
