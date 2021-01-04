import App from "@/components/App.svelte";
import routes from "@/router";
import blockRegistry from "@/components/Blocks/Blocks.registry";

const init = async () => {
  const dataEl = document.getElementById("_data");
  const target = document.getElementById("_app");
  const structure = JSON.parse((dataEl && dataEl.innerText) || "{}");

  const routeConfig = routes[structure.type];

  const [
    { default: templateComponent },
    { default: layoutComponent },
    components,
  ] = await Promise.all([
    // 1. Template component
    routeConfig.template(),

    // 2. Layout component
    routeConfig.layout
      ? routeConfig.layout()
      : import("@/components/Layout/Layout.svelte"),

    // 3. Dynamic components
    structure.componentRefs &&
      Object.fromEntries(
        await Promise.all(
          structure.componentRefs.map(async (c) => {
            const component = await blockRegistry[c].render();
            return [c, component.default];
          })
        )
      ),
  ]);

  const app = new App({
    target,
    hydrate: true,
    props: {
      structure,
      templateComponent,
      layoutComponent,
      components,
    },
  });

  window.app = app;
};

init();
