import { writable, get } from "svelte/store";
import axios from "axios";
import { loadComponentsFromData, loadLayoutFromRoute } from "@/client/router";

export const generateStores = ({ components: _components, data: _data }) => {
  const data = dataStore(_data);
  const components = componentsStore(_components);
  const router = routerStore({ components, data });

  if (typeof window !== "undefined") router.init();

  return {
    components,
    data,
    router,
  };
};

const dataStore = (data = {}) => {
  const store = writable({
    layout: data.layout || {},
    template: data.template || {},
    ...data,
  });
  return store;
};

const componentsStore = (components = {}) => {
  const store = writable({
    template: components.template,
    layout: components.layout,
    blocks: components.blocks,
  });
  return store;
};

const routerStore = ({ components: storeComponents, data: storeData }) => {
  const router = writable({ loading: false });

  const renderNewRoute = async (url) => {
    router.update((_router) => ({ ..._router, loading: true }));

    // 1. Get new layout component and compare it to previous one
    const newLayout = await loadLayoutFromRoute(url);
    const { layout: prevLayout } = get(storeComponents);
    const sameLayout = newLayout === prevLayout;

    let jsonUrl = `${url}?json=true`;

    // Don't fetch layout data if it doesn't change
    if (sameLayout) jsonUrl += `&refreshLayout=false`;

    // 2. Get data for new route
    const data = await axios.get(jsonUrl).then((res) => res.data);
    if (!data) {
      window.location = href;
      return;
    }

    // 3. Get components from data
    const components = await loadComponentsFromData(data);

    // 4. Update components stores (updating render)
    storeComponents.set({
      layout: newLayout,
      template: components.template,
      blocks: components.blocks,
    });

    // 5. Update data stores (updating render)
    storeData.update((prevData) => {
      return {
        ...data,
        // If same layout => Don't update layout data
        layout: sameLayout ? prevData.layout : data.layout,
        template: data.template,
      };
    });

    router.update((_router) => ({ ..._router, loading: false }));
  };

  router.navigate = async (href, scroll) => {
    window.history.pushState({}, "", href);
    await renderNewRoute(href);
  };

  router.init = () => {
    // Browser history navigation (ex : back / forward)
    window.addEventListener("popstate", async (e) => {
      const url = window.location;
      await renderNewRoute(url);
    });
  };
  return router;
};
