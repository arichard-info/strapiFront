export default {
  article: {
    path: "/blog/*",
    template: () => import("@/components/Templates/Article/Article.svelte"),
  },
  page: {
    path: "*",
    template: () => import("@/components/Templates/Page/Page.svelte"),
  },
};
