export default (route) => async (req, res, next) => {
  const structure = { type: route.type };

  const { getServerProps: getTemplateProps } =
    route.template && (await route.template());
  if (getTemplateProps && typeof getTemplateProps === "function") {
    structure.data = await getTemplateProps(req);
  }

  const { getServerProps: getLayoutProps } =
    route.layout && (await route.layout());
  if (getLayoutProps && typeof getLayoutProps === "function") {
    structure.layout = await getLayoutProps(req);
  }

  if (!structure.data) {
    res.status = 404;
    return next();
  }

  // If format = json return data directly
  if (req.query && req.query.json && req.query.json === "true") {
    return res.json(structure);
  }

  req.structure = structure;
  next();
};
