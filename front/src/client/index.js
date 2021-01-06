import App from "@/components/App.svelte";

import { loadComponents } from "./router";

const init = async () => {
  const dataEl = document.getElementById("_data");
  const target = document.getElementById("_app");
  const data = JSON.parse((dataEl && dataEl.innerText) || "{}");

  const components = await loadComponents({
    type: data.type,
    refs: data.componentRefs,
  });

  const app = new App({
    target,
    hydrate: true,
    props: {
      data,
      components,
    },
  });

  window.app = app;
};

init();
