import { writable } from "svelte/store";
import axios from "axios";
import { loadComponents } from "@/client/router";

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
    const data = await axios.get(`${url}?json=true`).then((res) => res.data);
    if (!data) {
      window.location = href;
      return;
    }

    const components = await loadComponents({
      type: data.type,
      refs: data.componentRefs,
    });

    storeComponents.set({
      template: components.template,
      layout: components.layout,
      blocks: components.blocks,
    });

    storeData.set({ layout: data.layout, template: data.template, ...data });
    router.update((_router) => ({ ..._router, loading: false }));
  };

  router.navigate = async (href, scroll) => {
    const data = await axios.get(`${href}?json=true`).then((res) => res.data);
    if (!data) {
      window.location = href;
      return;
    }
    window.history.pushState({}, "", href);
    await renderNewRoute(href);
  };

  router.init = () => {
    window.addEventListener("popstate", async (e) => {
      const url = window.location;
      await renderNewRoute(url);
    });
  };
  return router;
};
