const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const sidebarSchema = require("./sidebar");

const { mergeSchemas } = require("@graphql-tools/merge");

const mergedSchema = mergeSchemas({
  schemas: [BarSchema, BazSchema],
});

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    mergedSchema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.info("Listening on http://localhost:3000/graphql");
});
