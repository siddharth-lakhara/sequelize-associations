const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/users',
  handler: async (req, h) => {
    const {
      name, userName, mobileNum, address, posts, groups,
    } = req.payload;
    try {
      const results = await db.users.create({
        name,
        userName,
        userDetails: {
          mobileNum,
          address,
        },
        posts,
        groups,
      }, {
        include: [{
          model: db.userDetails,
          as: 'userDetails',
        }, {
          model: db.posts,
          as: 'posts',
        }, {
          model: db.groups,
          as: 'groups',
          through: db.users_groups,
        }],
      });
      return {
        success: true,
        id: results.id,
      };
    } catch (e) {
      console.log('error creating user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/users',
  handler: async (_, h) => {
    try {
      const results = await db.users.findAll({
        include: [{
          model: db.userDetails,
          as: 'userDetails',
        }, {
          model: db.posts,
          as: 'posts',
        }],
      });
      return results;
    } catch (e) {
      console.log('error fetching user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'PUT',
  path: '/users/{userId}',
  handler: async (req, h) => {
    const { userId } = req.params;
    const {
      name, userName, mobileNum, address, posts,
    } = req.payload;
    const updateUsersObject = {
      name,
      userName,
    };
    const updateUsersDetailsObject = {
      mobileNum,
      address,
    };

    try {
      const updatePromises = [];
      const updateUsersPromise = db.users.update(
        updateUsersObject,
        { where: { id: userId } },
      );
      updatePromises.push(updateUsersPromise);

      const updateUserDetailsPromise = db.userDetails.update(
        updateUsersDetailsObject,
        { where: { userId } },
      );
      updatePromises.push(updateUserDetailsPromise);

      const updatePostsPromises = posts.map((p) => {
        const { postTitle, postId } = p;
        const updateObject = {
          title: postTitle,
        };
        const whereQuery = {
          userId,
          id: postId,
        };
        return db.posts.update(
          updateObject,
          { where: whereQuery },
        );
      });
      updatePromises.push(...updatePostsPromises);

      await Promise.all(updatePromises);
      return 'user records updates';
    } catch (e) {
      console.log('error updating user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'DELETE',
  path: '/users/{userId}',
  handler: async (req, h) => {
    try {
      const { userId } = req.params;
      const results = await db.users.destroy({
        where: {
          id: userId,
        },
      });
      return results;
    } catch (e) {
      console.log('error deleting user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}];
