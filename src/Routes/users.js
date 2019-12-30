const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/users',
  handler: async (req, h) => {
    const {
      name, userName, mobileNum, address,
    } = req.payload;
    try {
      const results = await db.users.create({
        name,
        userName,
        userDetails: {
          mobileNum,
          address,
        },
      }, {
        include: {
          model: db.userDetails,
          as: 'userDetails',
        },
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
      name, userName, mobileNum, address,
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
        cascade: true,
        include: [{
          model: db.userDetails,
          as: 'userDetails',
          cascade: true,
        }],
      });
      return results;
    } catch (e) {
      console.log('error deleting user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}];
