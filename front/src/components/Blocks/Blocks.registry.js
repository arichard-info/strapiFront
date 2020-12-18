export default {
  "commons.paragraph": {
    render: () => import("@/components/Blocks/Paragraph/Paragraph"),
    admin: () => import("@/components/Blocks/Paragraph/Paragraph.admin"),
  },
  "commons.image": { render: () => import("@/components/Blocks/Image/Image") },
};
