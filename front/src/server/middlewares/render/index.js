import App from "@/components/App.svelte";
import * as Layout from "@/components/Layout/Layout.svelte";
import blockRegistry from "@/components/Blocks/Blocks.registry";
import HTMLTemplate from "./html";

export default (route) => async (req, res, next) => {
  const structure = req.structure;
  const { default: template } = await route.template();
  const { default: layout } = route.layout ? await route.layout : Layout;

  const blocks =
    structure &&
    structure.content &&
    structure.content.length &&
    Object.fromEntries(
      await Promise.all(
        structure.content.map(async (block) => {
          const component = await blockRegistry[block.__component].render();
          return [block.__component, component.default];
        })
      )
    );

  const { html, css, head } = App.render({
    structure: req.structure,
    blocks,
    template,
    layout,
  });

  const renderHtml = HTMLTemplate({
    html,
    css: css.code,
    head,
    structure,
  });
  res.send(renderHtml);
};
