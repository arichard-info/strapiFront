export default [
  {
    type: "article",
    path: "/blog/*",
    template: import("@/components/Templates/Article/Article.svelte"),
  },
  {
    type: "page",
    path: "*",
    template: import("@/components/Templates/Page/Page.svelte"),
  },
];
