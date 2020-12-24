"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const calcFullSlug = async ({ parent: parentId = null, slug = "/" }) => {
  let fullSlug = slug;
  while (parentId) {
    const parent = await strapi.services.page.findOne({ id: parentId });
    if (!parent) {
      parentId = null;
      return;
    }
    fullSlug = `${parent.slug}/${fullSlug}`;
    parentId = parent.parent;
  }
  return fullSlug;
};

const updateChildrenFullSlug = async (children, base) => {
  if (children && children.length) {
    await Promise.all(
      children.map(async (id) => {
        const page = await strapi.services.page.findOne({ id });
        const fullslug = `${base}/${page.slug}`;
        await strapi
          .query("page")
          .model.findOneAndUpdate({ _id: id }, { fullslug });
        await updateChildrenFullSlug(page.children, fullslug);
      })
    );
  }
};

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      data.fullslug = await calcFullSlug(data);
      await updateChildrenFullSlug(data.children, data.fullslug);
    },

    async beforeUpdate(params, data) {
      data.fullslug = await calcFullSlug(data);
      await updateChildrenFullSlug(data.children, data.fullslug);
    },
  },
};
