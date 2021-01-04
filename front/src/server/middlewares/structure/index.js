export default (route) => async (req, res, next) => {
  const structure = {
    type: route.type,
    componentRefs: [],
    layout: {},
    data: {},
  };

  const { getServerProps: getTemplateProps } =
    route.template && (await route.template());
  if (getTemplateProps && typeof getTemplateProps === "function") {
    structure.data = await getTemplateProps(req);
    if (structure.data && structure.data.components) {
      structure.componentRefs.push(...structure.data.components);
    }
  }

  const { getServerProps: getLayoutProps } =
    route.layout && (await route.layout());
  if (getLayoutProps && typeof getLayoutProps === "function") {
    structure.layout = await getLayoutProps(req);
    if (structure.layout && structure.layout.components) {
      structure.componentRefs.push(...structure.layout.components);
    }
  }

  structure.componentRefs = structure.componentRefs
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i);

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
