"use client";

// TODO: update with your query
import { pageRoleQuery } from "@/__generated__/pageRoleQuery.graphql";

import { Suspense } from "react";
import {
  graphql,
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";

// TODO: example of using a query
const UserRoleQuery = graphql`
  query pageRoleQuery {
    rolesCollection {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;

export default function Home(props: {
  queryRef: PreloadedQuery<pageRoleQuery>;
}) {
  const [queryReference, loadQuery] = useQueryLoader(
    UserRoleQuery,
    props.queryRef /* e.g. provided by router */
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Relay example</h1>
        <button
          type="button"
          onClick={() => loadQuery({})}
          disabled={queryReference != null}
        >
          Load Roles
        </button>
        {/* <h3>{JSON.stringify(data)}</h3> */}

        <Suspense fallback="Loading...">
          {queryReference != null ? (
            <NameDisplay queryReference={queryReference} />
          ) : null}
        </Suspense>
      </main>
    </div>
  );
}

function NameDisplay({
  queryReference,
}: {
  queryReference: PreloadedQuery<pageRoleQuery>;
}) {
  const data = usePreloadedQuery(UserRoleQuery, queryReference);

  return <h1>{JSON.stringify(data)}</h1>;
}
