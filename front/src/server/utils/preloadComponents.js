import routes from "@/router";
import blockRegistry from "@/components/Blocks/Blocks.registry";

export const preloadComponents = async () => {
  const COMPONENTS_REGISTRY = {
    routes: {},
    blocks: [],
  };
  COMPONENTS_REGISTRY.routes = await Promise.all(
    Object.entries(routes).map(async ([key, conf]) => [
      key,
      {
        layout: await conf.layout(),
        template: await conf.template(),
      },
    ])
  ).then(Object.fromEntries);

  COMPONENTS_REGISTRY.blocks = await Promise.all(
    Object.entries(blockRegistry).map(async ([key, conf]) => [
      key,
      await conf.render(),
    ])
  ).then(Object.fromEntries);

  return COMPONENTS_REGISTRY;
};
