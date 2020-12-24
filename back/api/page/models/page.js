"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const updateChildrenFullSlug = async (children, base) => {
  if (children && children.length) {
    await Promise.all(
      children.map(async (id) => {
        const page = await strapi.services.page.findOne({ id });
        const fullslug = `${base}/${page.slug}`;
        await strapi
          .query("page")
          .model.findOneAndUpdate({ _id: id }, { ...page, fullslug });
        await updateChildrenFullSlug(page.children, fullslug);
      })
    );
  }
};

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      const childrenIds = data.children;
      let parentId = data.parent;
      let fullSlug = data.slug;
      while (parentId) {
        const parent = await strapi.services.page.findOne({ id: parentId });
        if (!parent) {
          parentId = null;
          return;
        }
        fullSlug = `${parent.slug}/${fullSlug}`;
        parentId = parent.parent;
      }

      data.fullslug = fullSlug;
      await updateChildrenFullSlug(childrenIds, fullSlug);
    },

    async beforeUpdate(params, data) {
      const childrenIds = data.children;
      let parentId = data.parent;
      let fullSlug = data.slug;
      while (parentId) {
        const parent = await strapi.services.page.findOne({ id: parentId });
        if (!parent) {
          parentId = null;
          return;
        }
        fullSlug = `${parent.slug}/${fullSlug}`;
        parentId = parent.parent;
      }

      data.fullslug = fullSlug;
      await updateChildrenFullSlug(childrenIds, fullSlug);
    },
  },
};
