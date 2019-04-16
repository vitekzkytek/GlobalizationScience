module.exports = {
        typeDefs: /* GraphQL */ `type AggregateCountry {
  count: Int!
}

type AggregateField {
  count: Int!
}

type AggregateInterindex {
  count: Int!
}

type AggregateMethod {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Country {
  id: ID!
  gdppc2017: Float
  incomelevel: String
  iso2code: String
  iso3code: String
  lendingtype: String
  pop2017: Int
  region: String
  wb_name: String
  name: String!
  totdocs: Int!
}

type CountryConnection {
  pageInfo: PageInfo!
  edges: [CountryEdge]!
  aggregate: AggregateCountry!
}

input CountryCreateInput {
  gdppc2017: Float
  incomelevel: String
  iso2code: String
  iso3code: String
  lendingtype: String
  pop2017: Int
  region: String
  wb_name: String
  name: String!
  totdocs: Int!
}

input CountryCreateOneInput {
  create: CountryCreateInput
  connect: CountryWhereUniqueInput
}

type CountryEdge {
  node: Country!
  cursor: String!
}

enum CountryOrderByInput {
  id_ASC
  id_DESC
  gdppc2017_ASC
  gdppc2017_DESC
  incomelevel_ASC
  incomelevel_DESC
  iso2code_ASC
  iso2code_DESC
  iso3code_ASC
  iso3code_DESC
  lendingtype_ASC
  lendingtype_DESC
  pop2017_ASC
  pop2017_DESC
  region_ASC
  region_DESC
  wb_name_ASC
  wb_name_DESC
  name_ASC
  name_DESC
  totdocs_ASC
  totdocs_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CountryPreviousValues {
  id: ID!
  gdppc2017: Float
  incomelevel: String
  iso2code: String
  iso3code: String
  lendingtype: String
  pop2017: Int
  region: String
  wb_name: String
  name: String!
  totdocs: Int!
}

type CountrySubscriptionPayload {
  mutation: MutationType!
  node: Country
  updatedFields: [String!]
  previousValues: CountryPreviousValues
}

input CountrySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CountryWhereInput
  AND: [CountrySubscriptionWhereInput!]
  OR: [CountrySubscriptionWhereInput!]
  NOT: [CountrySubscriptionWhereInput!]
}

input CountryUpdateDataInput {
  gdppc2017: Float
  incomelevel: String
  iso2code: String
  iso3code: String
  lendingtype: String
  pop2017: Int
  region: String
  wb_name: String
  name: String
  totdocs: Int
}

input CountryUpdateInput {
  gdppc2017: Float
  incomelevel: String
  iso2code: String
  iso3code: String
  lendingtype: String
  pop2017: Int
  region: String
  wb_name: String
  name: String
  totdocs: Int
}

input CountryUpdateOneRequiredInput {
  create: CountryCreateInput
  update: CountryUpdateDataInput
  upsert: CountryUpsertNestedInput
  connect: CountryWhereUniqueInput
}

input CountryUpsertNestedInput {
  update: CountryUpdateDataInput!
  create: CountryCreateInput!
}

input CountryWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  gdppc2017: Float
  gdppc2017_not: Float
  gdppc2017_in: [Float!]
  gdppc2017_not_in: [Float!]
  gdppc2017_lt: Float
  gdppc2017_lte: Float
  gdppc2017_gt: Float
  gdppc2017_gte: Float
  incomelevel: String
  incomelevel_not: String
  incomelevel_in: [String!]
  incomelevel_not_in: [String!]
  incomelevel_lt: String
  incomelevel_lte: String
  incomelevel_gt: String
  incomelevel_gte: String
  incomelevel_contains: String
  incomelevel_not_contains: String
  incomelevel_starts_with: String
  incomelevel_not_starts_with: String
  incomelevel_ends_with: String
  incomelevel_not_ends_with: String
  iso2code: String
  iso2code_not: String
  iso2code_in: [String!]
  iso2code_not_in: [String!]
  iso2code_lt: String
  iso2code_lte: String
  iso2code_gt: String
  iso2code_gte: String
  iso2code_contains: String
  iso2code_not_contains: String
  iso2code_starts_with: String
  iso2code_not_starts_with: String
  iso2code_ends_with: String
  iso2code_not_ends_with: String
  iso3code: String
  iso3code_not: String
  iso3code_in: [String!]
  iso3code_not_in: [String!]
  iso3code_lt: String
  iso3code_lte: String
  iso3code_gt: String
  iso3code_gte: String
  iso3code_contains: String
  iso3code_not_contains: String
  iso3code_starts_with: String
  iso3code_not_starts_with: String
  iso3code_ends_with: String
  iso3code_not_ends_with: String
  lendingtype: String
  lendingtype_not: String
  lendingtype_in: [String!]
  lendingtype_not_in: [String!]
  lendingtype_lt: String
  lendingtype_lte: String
  lendingtype_gt: String
  lendingtype_gte: String
  lendingtype_contains: String
  lendingtype_not_contains: String
  lendingtype_starts_with: String
  lendingtype_not_starts_with: String
  lendingtype_ends_with: String
  lendingtype_not_ends_with: String
  pop2017: Int
  pop2017_not: Int
  pop2017_in: [Int!]
  pop2017_not_in: [Int!]
  pop2017_lt: Int
  pop2017_lte: Int
  pop2017_gt: Int
  pop2017_gte: Int
  region: String
  region_not: String
  region_in: [String!]
  region_not_in: [String!]
  region_lt: String
  region_lte: String
  region_gt: String
  region_gte: String
  region_contains: String
  region_not_contains: String
  region_starts_with: String
  region_not_starts_with: String
  region_ends_with: String
  region_not_ends_with: String
  wb_name: String
  wb_name_not: String
  wb_name_in: [String!]
  wb_name_not_in: [String!]
  wb_name_lt: String
  wb_name_lte: String
  wb_name_gt: String
  wb_name_gte: String
  wb_name_contains: String
  wb_name_not_contains: String
  wb_name_starts_with: String
  wb_name_not_starts_with: String
  wb_name_ends_with: String
  wb_name_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  totdocs: Int
  totdocs_not: Int
  totdocs_in: [Int!]
  totdocs_not_in: [Int!]
  totdocs_lt: Int
  totdocs_lte: Int
  totdocs_gt: Int
  totdocs_gte: Int
  AND: [CountryWhereInput!]
  OR: [CountryWhereInput!]
  NOT: [CountryWhereInput!]
}

input CountryWhereUniqueInput {
  id: ID
}

type Field {
  id: ID!
  name: String!
  level: String!
  scopus_code: String!
  scopus_name: String!
}

type FieldConnection {
  pageInfo: PageInfo!
  edges: [FieldEdge]!
  aggregate: AggregateField!
}

input FieldCreateInput {
  name: String!
  level: String!
  scopus_code: String!
  scopus_name: String!
}

input FieldCreateOneInput {
  create: FieldCreateInput
  connect: FieldWhereUniqueInput
}

type FieldEdge {
  node: Field!
  cursor: String!
}

enum FieldOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  level_ASC
  level_DESC
  scopus_code_ASC
  scopus_code_DESC
  scopus_name_ASC
  scopus_name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FieldPreviousValues {
  id: ID!
  name: String!
  level: String!
  scopus_code: String!
  scopus_name: String!
}

type FieldSubscriptionPayload {
  mutation: MutationType!
  node: Field
  updatedFields: [String!]
  previousValues: FieldPreviousValues
}

input FieldSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FieldWhereInput
  AND: [FieldSubscriptionWhereInput!]
  OR: [FieldSubscriptionWhereInput!]
  NOT: [FieldSubscriptionWhereInput!]
}

input FieldUpdateDataInput {
  name: String
  level: String
  scopus_code: String
  scopus_name: String
}

input FieldUpdateInput {
  name: String
  level: String
  scopus_code: String
  scopus_name: String
}

input FieldUpdateOneRequiredInput {
  create: FieldCreateInput
  update: FieldUpdateDataInput
  upsert: FieldUpsertNestedInput
  connect: FieldWhereUniqueInput
}

input FieldUpsertNestedInput {
  update: FieldUpdateDataInput!
  create: FieldCreateInput!
}

input FieldWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  level: String
  level_not: String
  level_in: [String!]
  level_not_in: [String!]
  level_lt: String
  level_lte: String
  level_gt: String
  level_gte: String
  level_contains: String
  level_not_contains: String
  level_starts_with: String
  level_not_starts_with: String
  level_ends_with: String
  level_not_ends_with: String
  scopus_code: String
  scopus_code_not: String
  scopus_code_in: [String!]
  scopus_code_not_in: [String!]
  scopus_code_lt: String
  scopus_code_lte: String
  scopus_code_gt: String
  scopus_code_gte: String
  scopus_code_contains: String
  scopus_code_not_contains: String
  scopus_code_starts_with: String
  scopus_code_not_starts_with: String
  scopus_code_ends_with: String
  scopus_code_not_ends_with: String
  scopus_name: String
  scopus_name_not: String
  scopus_name_in: [String!]
  scopus_name_not_in: [String!]
  scopus_name_lt: String
  scopus_name_lte: String
  scopus_name_gt: String
  scopus_name_gte: String
  scopus_name_contains: String
  scopus_name_not_contains: String
  scopus_name_starts_with: String
  scopus_name_not_starts_with: String
  scopus_name_ends_with: String
  scopus_name_not_ends_with: String
  AND: [FieldWhereInput!]
  OR: [FieldWhereInput!]
  NOT: [FieldWhereInput!]
}

input FieldWhereUniqueInput {
  id: ID
}

type Interindex {
  country_code: Country!
  field_code: Field!
  method_code: Method!
  id: ID!
  period: Int!
  value: Float
}

type InterindexConnection {
  pageInfo: PageInfo!
  edges: [InterindexEdge]!
  aggregate: AggregateInterindex!
}

input InterindexCreateInput {
  country_code: CountryCreateOneInput!
  field_code: FieldCreateOneInput!
  method_code: MethodCreateOneInput!
  period: Int!
  value: Float
}

type InterindexEdge {
  node: Interindex!
  cursor: String!
}

enum InterindexOrderByInput {
  id_ASC
  id_DESC
  period_ASC
  period_DESC
  value_ASC
  value_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type InterindexPreviousValues {
  id: ID!
  period: Int!
  value: Float
}

type InterindexSubscriptionPayload {
  mutation: MutationType!
  node: Interindex
  updatedFields: [String!]
  previousValues: InterindexPreviousValues
}

input InterindexSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: InterindexWhereInput
  AND: [InterindexSubscriptionWhereInput!]
  OR: [InterindexSubscriptionWhereInput!]
  NOT: [InterindexSubscriptionWhereInput!]
}

input InterindexUpdateInput {
  country_code: CountryUpdateOneRequiredInput
  field_code: FieldUpdateOneRequiredInput
  method_code: MethodUpdateOneRequiredInput
  period: Int
  value: Float
}

input InterindexWhereInput {
  country_code: CountryWhereInput
  field_code: FieldWhereInput
  method_code: MethodWhereInput
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  period: Int
  period_not: Int
  period_in: [Int!]
  period_not_in: [Int!]
  period_lt: Int
  period_lte: Int
  period_gt: Int
  period_gte: Int
  value: Float
  value_not: Float
  value_in: [Float!]
  value_not_in: [Float!]
  value_lt: Float
  value_lte: Float
  value_gt: Float
  value_gte: Float
  AND: [InterindexWhereInput!]
  OR: [InterindexWhereInput!]
  NOT: [InterindexWhereInput!]
}

input InterindexWhereUniqueInput {
  id: ID
}

scalar Long

type Method {
  id: ID!
  minmax: String!
  short_name: String!
  full_name: String!
  short_desc: String
  long_desc: String
  formula: String
}

type MethodConnection {
  pageInfo: PageInfo!
  edges: [MethodEdge]!
  aggregate: AggregateMethod!
}

input MethodCreateInput {
  minmax: String!
  short_name: String!
  full_name: String!
  short_desc: String
  long_desc: String
  formula: String
}

input MethodCreateOneInput {
  create: MethodCreateInput
  connect: MethodWhereUniqueInput
}

type MethodEdge {
  node: Method!
  cursor: String!
}

enum MethodOrderByInput {
  id_ASC
  id_DESC
  minmax_ASC
  minmax_DESC
  short_name_ASC
  short_name_DESC
  full_name_ASC
  full_name_DESC
  short_desc_ASC
  short_desc_DESC
  long_desc_ASC
  long_desc_DESC
  formula_ASC
  formula_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MethodPreviousValues {
  id: ID!
  minmax: String!
  short_name: String!
  full_name: String!
  short_desc: String
  long_desc: String
  formula: String
}

type MethodSubscriptionPayload {
  mutation: MutationType!
  node: Method
  updatedFields: [String!]
  previousValues: MethodPreviousValues
}

input MethodSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MethodWhereInput
  AND: [MethodSubscriptionWhereInput!]
  OR: [MethodSubscriptionWhereInput!]
  NOT: [MethodSubscriptionWhereInput!]
}

input MethodUpdateDataInput {
  minmax: String
  short_name: String
  full_name: String
  short_desc: String
  long_desc: String
  formula: String
}

input MethodUpdateInput {
  minmax: String
  short_name: String
  full_name: String
  short_desc: String
  long_desc: String
  formula: String
}

input MethodUpdateOneRequiredInput {
  create: MethodCreateInput
  update: MethodUpdateDataInput
  upsert: MethodUpsertNestedInput
  connect: MethodWhereUniqueInput
}

input MethodUpsertNestedInput {
  update: MethodUpdateDataInput!
  create: MethodCreateInput!
}

input MethodWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  minmax: String
  minmax_not: String
  minmax_in: [String!]
  minmax_not_in: [String!]
  minmax_lt: String
  minmax_lte: String
  minmax_gt: String
  minmax_gte: String
  minmax_contains: String
  minmax_not_contains: String
  minmax_starts_with: String
  minmax_not_starts_with: String
  minmax_ends_with: String
  minmax_not_ends_with: String
  short_name: String
  short_name_not: String
  short_name_in: [String!]
  short_name_not_in: [String!]
  short_name_lt: String
  short_name_lte: String
  short_name_gt: String
  short_name_gte: String
  short_name_contains: String
  short_name_not_contains: String
  short_name_starts_with: String
  short_name_not_starts_with: String
  short_name_ends_with: String
  short_name_not_ends_with: String
  full_name: String
  full_name_not: String
  full_name_in: [String!]
  full_name_not_in: [String!]
  full_name_lt: String
  full_name_lte: String
  full_name_gt: String
  full_name_gte: String
  full_name_contains: String
  full_name_not_contains: String
  full_name_starts_with: String
  full_name_not_starts_with: String
  full_name_ends_with: String
  full_name_not_ends_with: String
  short_desc: String
  short_desc_not: String
  short_desc_in: [String!]
  short_desc_not_in: [String!]
  short_desc_lt: String
  short_desc_lte: String
  short_desc_gt: String
  short_desc_gte: String
  short_desc_contains: String
  short_desc_not_contains: String
  short_desc_starts_with: String
  short_desc_not_starts_with: String
  short_desc_ends_with: String
  short_desc_not_ends_with: String
  long_desc: String
  long_desc_not: String
  long_desc_in: [String!]
  long_desc_not_in: [String!]
  long_desc_lt: String
  long_desc_lte: String
  long_desc_gt: String
  long_desc_gte: String
  long_desc_contains: String
  long_desc_not_contains: String
  long_desc_starts_with: String
  long_desc_not_starts_with: String
  long_desc_ends_with: String
  long_desc_not_ends_with: String
  formula: String
  formula_not: String
  formula_in: [String!]
  formula_not_in: [String!]
  formula_lt: String
  formula_lte: String
  formula_gt: String
  formula_gte: String
  formula_contains: String
  formula_not_contains: String
  formula_starts_with: String
  formula_not_starts_with: String
  formula_ends_with: String
  formula_not_ends_with: String
  AND: [MethodWhereInput!]
  OR: [MethodWhereInput!]
  NOT: [MethodWhereInput!]
}

input MethodWhereUniqueInput {
  id: ID
}

type Mutation {
  createCountry(data: CountryCreateInput!): Country!
  updateCountry(data: CountryUpdateInput!, where: CountryWhereUniqueInput!): Country
  updateManyCountries(data: CountryUpdateInput!, where: CountryWhereInput): BatchPayload!
  upsertCountry(where: CountryWhereUniqueInput!, create: CountryCreateInput!, update: CountryUpdateInput!): Country!
  deleteCountry(where: CountryWhereUniqueInput!): Country
  deleteManyCountries(where: CountryWhereInput): BatchPayload!
  createField(data: FieldCreateInput!): Field!
  updateField(data: FieldUpdateInput!, where: FieldWhereUniqueInput!): Field
  updateManyFields(data: FieldUpdateInput!, where: FieldWhereInput): BatchPayload!
  upsertField(where: FieldWhereUniqueInput!, create: FieldCreateInput!, update: FieldUpdateInput!): Field!
  deleteField(where: FieldWhereUniqueInput!): Field
  deleteManyFields(where: FieldWhereInput): BatchPayload!
  createInterindex(data: InterindexCreateInput!): Interindex!
  updateInterindex(data: InterindexUpdateInput!, where: InterindexWhereUniqueInput!): Interindex
  updateManyInterindexes(data: InterindexUpdateInput!, where: InterindexWhereInput): BatchPayload!
  upsertInterindex(where: InterindexWhereUniqueInput!, create: InterindexCreateInput!, update: InterindexUpdateInput!): Interindex!
  deleteInterindex(where: InterindexWhereUniqueInput!): Interindex
  deleteManyInterindexes(where: InterindexWhereInput): BatchPayload!
  createMethod(data: MethodCreateInput!): Method!
  updateMethod(data: MethodUpdateInput!, where: MethodWhereUniqueInput!): Method
  updateManyMethods(data: MethodUpdateInput!, where: MethodWhereInput): BatchPayload!
  upsertMethod(where: MethodWhereUniqueInput!, create: MethodCreateInput!, update: MethodUpdateInput!): Method!
  deleteMethod(where: MethodWhereUniqueInput!): Method
  deleteManyMethods(where: MethodWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  country(where: CountryWhereUniqueInput!): Country
  countries(where: CountryWhereInput, orderBy: CountryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Country]!
  countriesConnection(where: CountryWhereInput, orderBy: CountryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CountryConnection!
  field(where: FieldWhereUniqueInput!): Field
  fields(where: FieldWhereInput, orderBy: FieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Field]!
  fieldsConnection(where: FieldWhereInput, orderBy: FieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FieldConnection!
  interindex(where: InterindexWhereUniqueInput!): Interindex
  interindexes(where: InterindexWhereInput, orderBy: InterindexOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Interindex]!
  interindexesConnection(where: InterindexWhereInput, orderBy: InterindexOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): InterindexConnection!
  method(where: MethodWhereUniqueInput!): Method
  methods(where: MethodWhereInput, orderBy: MethodOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Method]!
  methodsConnection(where: MethodWhereInput, orderBy: MethodOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MethodConnection!
  node(id: ID!): Node
}

type Subscription {
  country(where: CountrySubscriptionWhereInput): CountrySubscriptionPayload
  field(where: FieldSubscriptionWhereInput): FieldSubscriptionPayload
  interindex(where: InterindexSubscriptionWhereInput): InterindexSubscriptionPayload
  method(where: MethodSubscriptionWhereInput): MethodSubscriptionPayload
}
`
      }
    