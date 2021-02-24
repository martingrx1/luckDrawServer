const { graphqlHTTP } = require("express-graphql");
const { mergeSchemas } = require("@graphql-tools/merge");
const paperGqlSchema = require("./paper");
const mergedSchema = mergeSchemas({
  schemas: [paperGqlSchema],
});

module.exports = {
  path: "/graphql",
  middleware: graphqlHTTP({
    schema: mergedSchema,
    graphiql: true,
  }),
};
