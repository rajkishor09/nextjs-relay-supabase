module.exports = {
  src: "./",
  language: "typescript",
  schema: "./relay/schema.graphql",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  artifactDirectory: "./__generated__",
  // pg_graphql specific options
  schemaConfig: {
    nodeInterfaceIdField: "nodeId",
    nodeInterfaceIdVariableName: "nodeId",
  },
  customScalarTypes: {
    UUID: "string",
    Datetime: "string",
    JSON: "string",
    BigInt: "string",
    BigFloat: "string",
    Opaque: "any",
  },
};
