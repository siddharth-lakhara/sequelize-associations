const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/groups/create',
  handler: async (req, h) => {
    const { groupName } = req.payload;
    try {
      await db.groups.create({
        groupName,
      });
      return 'ok';
    } catch (e) {
      console.log('error creating group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'POST',
  path: '/groups/addUser',
  handler: async (req, h) => {
    const { userId, groupId } = req.payload;
    try {
      const results = await db.users_groups.create({
        userId,
        groupId,
      });
      return {
        success: true,
        results,
      };
    } catch (e) {
      console.log('error creating group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/groups',
  handler: async (_, h) => {
    try {
      const results = await db.groups.findAll({
        attributes: ['id', 'groupName'],
      });
      return results;
    } catch (e) {
      console.log('error creating group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/groups/{groupId}',
  handler: async (req, h) => {
    const { groupId } = req.params;
    try {
      const results = await db.groups.findAll({
        where: { id: groupId },
        attributes: ['id', 'groupName'],
        include: {
          model: db.users,
          as: 'users',
          attributes: ['id', 'userName', 'name'],
        },
      });
      return results;
    } catch (e) {
      console.log('error creating group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'PUT',
  path: '/groups/{groupId}',
  handler: async (req, h) => {
    const { groupId } = req.params;
    const { groupName } = req.payload;
    try {
      const noOfRecordsUpdated = await db.groups.update({
        groupName,
      }, {
        where: { id: groupId },
      });
      return {
        success: true,
        results: noOfRecordsUpdated,
      };
    } catch (e) {
      console.log('error modifying group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'DELETE',
  path: '/groups/{groupId}',
  handler: async (req, h) => {
    const { groupId } = req.params;
    try {
      const results = await db.groups.destroy({
        where: { id: groupId },
      });
      return {
        success: true,
        results,
      };
    } catch (e) {
      console.log('error modifying group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'DELETE',
  path: '/groups/{groupId}/{userId}',
  handler: async (req, h) => {
    const { groupId, userId } = req.params;
    try {
      const results = await db.users_groups.destroy({
        where: { groupId, userId },
      });
      return {
        success: true,
        results,
      };
    } catch (e) {
      console.log('error modifying group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}];
