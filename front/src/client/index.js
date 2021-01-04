import App from "@/components/App.svelte";
import routes from "@/router";
import blockRegistry from "@/components/Blocks/Blocks.registry";

const init = async () => {
  const dataEl = document.getElementById("_data");
  const target = document.getElementById("_app");
  const structure = JSON.parse((dataEl && dataEl.innerText) || "{}");

  const routeConfig = routes[structure.type];
  const { default: template } = await routeConfig.template();
  const { default: layout } = routeConfig.layout
    ? await routeConfig.layout()
    : await import("@/components/Layout/Layout.svelte");

  const components =
    structure.componentRefs &&
    Object.fromEntries(
      await Promise.all(
        structure.componentRefs.map(async (c) => {
          const component = await blockRegistry[c].render();
          return [c, component.default];
        })
      )
    );

  const app = new App({
    target,
    hydrate: true,
    props: {
      structure,
      template,
      layout,
      components,
    },
  });

  window.app = app;
};

init();
