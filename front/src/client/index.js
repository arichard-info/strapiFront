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
  const blocks =
    structure &&
    structure.data &&
    structure.data.content &&
    structure.data.content.length &&
    Object.fromEntries(
      await Promise.all(
        structure.data.content.map(async (block) => {
          const component = await blockRegistry[block.__component].render();
          return [block.__component, component.default];
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
      blocks,
    },
  });

  window.app = app;
};

init();
