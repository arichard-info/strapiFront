import App from "@/components/App.svelte";
import HTMLTemplate from "./html";

export default (route) => async (req, res, next) => {
  const data = req.data;
  const { default: template } = route.template;
  const { default: layout = false } = route.layout;

  const blocks = Object.fromEntries(
    Object.entries(route.blocks).map(([key, block]) => [key, block.default])
  );

  const { html, css, head } = App.render({
    data,
    components: { template, layout, blocks },
  });

  const renderHtml = HTMLTemplate({
    html,
    css: css.code,
    head,
    data,
  });
  res.send(renderHtml);
};
