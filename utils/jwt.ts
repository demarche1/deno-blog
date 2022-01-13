import { create, getNumericDate } from "../deps.ts";

interface Payload {
  iss: string;
  exp: number;
}

export const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"]
);

export const generateJwt = async (payload: Payload) => {
  const jwt = await create(
    { alg: "HS512", typ: "JWT" },
    { iss: payload.iss, exp: getNumericDate(payload.exp) },
    key
  );

  return jwt;
};
