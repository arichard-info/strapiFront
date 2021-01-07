import routes from "@/router";
import blockRegistry from "@/components/Blocks/Blocks.registry";
import pathToRegexp from "path-to-regexp";

export const getConfigFromRoute = (route) => {
  if (!route) return;
  const type = Object.keys(routes).find((key) => {
    const regex = pathToRegexp(routes[key].path);
    return regex.test(route);
  });
  return routes[type];
};

export const loadLayoutFromRoute = async (route) => {
  const config = getConfigFromRoute(route);
  if (config && config.layout && typeof config.layout === "function") {
    const module = await config.layout();
    return module && module.default;
  }
};

export const loadComponentsFromData = async ({
  type = "",
  componentRefs = [],
}) => {
  const routeConfig = routes[type];
  const [
    { default: template },
    { default: layout },
    blocks,
  ] = await Promise.all([
    // 1. Template component
    routeConfig.template(),

    // 2. Layout component
    routeConfig.layout
      ? routeConfig.layout()
      : import("@/components/Layout/Layout.svelte"),

    // 3. Dynamic components
    componentRefs &&
      Object.fromEntries(
        await Promise.all(
          componentRefs.map(async (c) => {
            const component = await blockRegistry[c].render();
            return [c, component.default];
          })
        )
      ),
  ]);

  return {
    template,
    layout,
    blocks,
  };
};
