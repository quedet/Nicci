'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils')
// const { createCoreController } = require("@strapi/strapi").factories

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);

          if (!data || !data.description) {
              ctx.throw(400, "Please provide some description")
          }

          if (!files || !files.image) {
              ctx.throw(400, "Please upload at least an image")
          }

          entity = await strapi.services.post.create({ ...data, likes: 0 }, { files });
        } else {
            ctx.throw(400, "You must submit a multipart request")
        }
        
        return sanitizeEntity(entity, { model: strapi.models.post });
    },

    async findOne(ctx) {
        const { id } = ctx.params
        const entity = await strapi.services.post.findOne({ id })

        return sanitizeEntity(entity, { model: strapi.models.post })
    }
}