import App from "@/components/App.svelte";
import * as Layout from "@/components/Layout/Layout.svelte";
import blockRegistry from "@/components/Blocks/Blocks.registry";

export default (route) => async (req, res, next) => {
  const structure = req.structure;
  const { default: template } = await route.template;
  const { default: layout } = route.layout ? await route.layout : Layout;

  const blocks =
    structure.content &&
    structure.content.length &&
    Object.fromEntries(
      await Promise.all(
        structure.content.map(async (block) => {
          const component = await blockRegistry[block.__component];
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

  res.send(html);
};
