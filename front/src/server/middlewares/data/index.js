export default (route) => async (req, res, next) => {
  const data = {
    type: route.type,
    componentRefs: [],
    layout: {},
    template: {},
  };

  const { getServerProps: getTemplateProps } =
    (route.template && (await route.template())) || {};
  if (getTemplateProps && typeof getTemplateProps === "function") {
    data.template = (await getTemplateProps(req)) || {};
    if (data.template && data.template.components) {
      data.componentRefs.push(...data.template.components);
    }
  }

  // Check if layout refresh is needed
  if (
    !req.query ||
    !req.query.refreshLayout ||
    req.query.refreshLayout !== "false"
  ) {
    const { getServerProps: getLayoutProps } =
      (route.layout && (await route.layout())) || {};
    if (getLayoutProps && typeof getLayoutProps === "function") {
      data.layout = await getLayoutProps(req);
      if (data.layout && data.layout.components) {
        data.componentRefs.push(...data.layout.components);
      }
    }
  }

  data.componentRefs = data.componentRefs
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i);

  // If format = json return data directly
  if (req.query && req.query.json && req.query.json === "true") {
    return res.json(data);
  }

  req.data = data;
  next();
};
