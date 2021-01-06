import routes from "@/router";
import blockRegistry from "@/components/Blocks/Blocks.registry";

export const loadComponents = async ({ type, refs }) => {
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
    refs &&
      Object.fromEntries(
        await Promise.all(
          refs.map(async (c) => {
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
