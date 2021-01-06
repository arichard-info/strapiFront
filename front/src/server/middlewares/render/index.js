import App from "@/components/App.svelte";
import blockRegistry from "@/components/Blocks/Blocks.registry";
import HTMLTemplate from "./html";

export default (route) => async (req, res, next) => {
  const data = req.data;
  const { default: template } = route.template && (await route.template());
  const { default: layout = false } = route.layout && (await route.layout());

  const blocks =
    data?.componentRefs?.length &&
    Object.fromEntries(
      await Promise.all(
        data.componentRefs.map(async (c) => {
          const component = await blockRegistry[c].render();
          return [c, component.default];
        })
      )
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
