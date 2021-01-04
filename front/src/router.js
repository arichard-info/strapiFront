export default {
  article: {
    path: "/blog/*",
    template: () => import("@/components/Templates/Article/Article.svelte"),
    layout: () => import("@/components/Layout/Layout.svelte"),
  },
  page: {
    path: "*",
    template: () => import("@/components/Templates/Page/Page.svelte"),
    layout: () => import("@/components/Layout/Layout.svelte"),
  },
};
