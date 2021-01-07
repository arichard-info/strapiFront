export default {
  blogList: {
    path: "/blog",
    template: () => import("@/components/Templates/Blog/List/List.svelte"),
    layout: () => import("@/components/Layout/Blog/Blog.svelte"),
  },
  blogArticle: {
    path: "/blog/:slug",
    template: () => import("@/components/Templates/Blog/Single/Single.svelte"),
    layout: () => import("@/components/Layout/Blog/Blog.svelte"),
  },
  page: {
    path: "/*",
    template: () => import("@/components/Templates/Page/Page.svelte"),
    layout: () => import("@/components/Layout/Layout.svelte"),
  },
};
