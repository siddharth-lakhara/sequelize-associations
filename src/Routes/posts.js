const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/posts',
  handler: async (req, h) => {
    const { userId, title } = req.payload;
    try {
      await db.posts.create({
        userId,
        title,
      });
      return 'ok';
    } catch (e) {
      console.log('error creating post:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/posts/{userId}',
  handler: async (req, h) => {
    const { userId } = req.params;
    try {
      const results = await db.posts.findAll({
        where: { userId },
        attributes: ['title', 'userId'],
        include: {
          model: db.users,
          as: 'users',
          attributes: ['userName', 'name'],
        },
      });
      return {
        success: true,
        results,
      };
    } catch (e) {
      console.log('error fetching posts:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'PUT',
  path: '/posts/{postId}',
  handler: async (req, h) => {
    const { postId } = req.params;
    const { userId, title } = req.payload;
    try {
      const results = await db.posts.update({
        userId,
        title,
      }, {
        where: { id: postId },
      });
      return {
        success: true,
        results,
      };
    } catch (e) {
      console.log('error fetching posts:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'DELETE',
  path: '/posts/{postId}',
  handler: async (req, h) => {
    const { postId } = req.params;
    try {
      const results = await db.posts.destroy({
        where: { id: postId },
      });
      return {
        success: true,
        results,
      };
    } catch (e) {
      console.log('error fetching posts:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}];
