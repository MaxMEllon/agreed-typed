import {
  APIDef,
  Capture,
  Error404,
  GET,
  ResponseDef,
  Success200
} from "../../types";

/**
 * Ping GET API
 * description area
 * may be acceptable `.md` syntax
 * @summary PING Get API
 */
export type PingAPI = APIDef<
  GET, // HTTP Method
  ["ping", Capture<":message">], // /ping/:message
  { apiKey: "x-api-key"; foo?: string }, // request header
  { q: string; qoo?: string; moo: "moo" | "mooo" }, // request query
  undefined, // request body
  { "x-token": "xxx" }, // response header
  ResponseDef<Success200, PongBody> | ResponseDef<Error404, ErrorPongBody> // response
>;

type PongBody = {
  message: string;
};

type ErrorPongBody = {
  errorCode: string;
  message: string;
};

const pingAPIs: PingAPI[] = [
  {
    request: {
      path: ["ping", "test"], // /ping/test/hoge
      query: {
        q: "{:query}",
        moo: "moo"
      },
      method: "GET",
      body: undefined
    },
    response: {
      headers: { "x-token": "xxx" },
      status: 200,
      body: { message: "test" }
    }
  },
  {
    request: {
      path: ["ping", ":message"], // /ping/:message
      method: "GET",
      body: undefined
    },
    response: {
      headers: { "x-token": "xxx" },
      status: 200,
      body: { message: "ok {:message}" }
    }
  },
  {
    request: {
      path: ["ping", "notfound"], // /ping/:message
      method: "GET",
      body: undefined
    },
    response: {
      status: 404,
      body: { errorCode: "404", message: "invalid id" }
    }
  }
];

module.exports = pingAPIs;
