import resolvers from "./resolvers";

export default (route) => async (req, res, next) => {
  const resolver = await resolvers[route.type];
  const structure = await resolver.default(req);

  if (!structure) {
    res.status = 404;
    return next();
  }

  structure.type = route.type;

  // If format = json return data directly
  if (req.query && req.query.json && req.query.json === "true") {
    return res.json(structure);
  }

  req.structure = structure;
  next();
};
