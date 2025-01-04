import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";

const GRAPHQL_URL = process.env.GRAPHQL_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!;

const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`, // update this with session token
      // <-- Additional headers would go here
    },
    body: JSON.stringify({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    }),
  });

  return await resp.json();
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
    getDataID: (node) => node.nodeId,
    missingFieldHandlers: [
      {
        handle(field, _record, argValues) {
          if (field.name === "node" && "nodeId" in argValues) {
            // If field is node(nodeId: $nodeId), look up the record by the value of $nodeId
            return argValues.nodeId;
          }

          return undefined;
        },
        kind: "linked",
      },
    ],
  });
}

let relayEnvironment: Environment | undefined;

export function initRelayEnvironment() {
  const environment = relayEnvironment ?? createRelayEnvironment();

  // For SSG and SSR always create a new Relay environment.
  if (typeof window === "undefined") {
    return environment;
  }

  // Create the Relay environment once in the client
  // and then reuse it.
  if (!relayEnvironment) {
    relayEnvironment = environment;
  }

  return relayEnvironment;
}
