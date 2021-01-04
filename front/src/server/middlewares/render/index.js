import App from "@/components/App.svelte";
import blockRegistry from "@/components/Blocks/Blocks.registry";
import HTMLTemplate from "./html";

export default (route) => async (req, res, next) => {
  const structure = req.structure;
  const { default: templateComponent } =
    route.template && (await route.template());
  const { default: layoutComponent = false } =
    route.layout && (await route.layout());

  const components =
    structure?.componentRefs?.length &&
    Object.fromEntries(
      await Promise.all(
        structure.componentRefs.map(async (c) => {
          const component = await blockRegistry[c].render();
          return [c, component.default];
        })
      )
    );

  const { html, css, head } = App.render({
    structure: req.structure,
    components,
    templateComponent,
    layoutComponent,
  });

  const renderHtml = HTMLTemplate({
    html,
    css: css.code,
    head,
    structure,
  });
  res.send(renderHtml);
};
