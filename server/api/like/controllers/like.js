'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils')
const { createCoreController } = require('@strapi/strapi').factories

module.exports = {
    async create(ctx) {
        let entity

        const { user } = ctx.state
        const { post } = ctx.request.body

        if (typeof post !== 'number') {
            ctx.throw(400, "Please only pass the id for the post")
        }

        const realPost = await strapi.services.post.findOne({
            id: post
        })

        if (!realPost) {
            ctx.throw(400, "")
        }

        const found = await strapi.services.like.findOne({
            user: user.id,
            post
        })

        if (found) {
            ctx.throw(400, "You have already liked this post")
        }

        if (ctx.is('multipart')) {
            ctx.throw(400, "Only make JSON requests")
        } else {
            entity = await strapi.services.post.update({
                id: post
            }, {
                likes: likes + 1
            })
        }

        return sanitizeEntity(entity, { model: strapi.models.like })
    },
}
