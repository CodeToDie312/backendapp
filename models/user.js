const prisma = require("../utils/prisma");
const User = {
    tablename: "User",
    writable: [],

    create: async function (data) {
        try {
          const user = await prisma.user.create({data});
          return user;
        } catch (error) {
          console.error("FAILED TO CREATE USER.", error.message);
          return { user: null, error: error.message };
        }
    },

    get: async function (clause = {}) {
        try {
          const user = await prisma.user.findFirst({ where: clause });
          return user;
        } catch (error) {
          console.error("FAILED TO GET USER.", error.message);
          return null;
        }
    },

    update: async function (id, data = {}) {
        if (!id) throw new Error("No user for update");
    
        try {
          const user = await prisma.user.update({
            where: { id : id},
            data:{
              ...data
            },
          });
          return { user, error: null };
        } catch (error) {
          console.error(error.message);
          return { user: null, message: error.message };
        }
    },

    delete: async function (clause = {}) {
        try {
          await prisma.user.delete({ where: clause });
          return true;
        } catch (error) {
          console.error("FAILED TO DELETE USER.", error.message);
          return false;
        }
    },
}
module.exports = { User };