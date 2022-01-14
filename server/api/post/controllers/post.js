'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

// const { parseMultipartData, sanitizeEntity } = require('strapi-utils')
// const { createCoreController } = require('@strapi/strapi').factories

// module.exports = createCoreController('api::post.post', ({ strapi }) => ({
//     async create (ctx) {
//         let entity

//         if (ctx.is("multipart")) {
//             const { data, file } = parseMultipartData(ctx)
//             entity = await strapi.services.post.create({...data, likes: 0 }, { files })
//         } else {
//             entity = await strapi.services.post.create({...ctx.request.body, likes: 0 })
//         }

//         console.log(entity)

//         return sanitizeEntity(entity, { model: strapi.models.post })
//     }
// }))