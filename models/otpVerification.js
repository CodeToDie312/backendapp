const prisma = require("../utils/prisma");
const otpVerification = {
    tablename: 'OtpVerification',
    writable: [],

    create: async function (data = {}) {
        try {
          const otpVerification = await prisma.otpVerification.create({data});
          return { otpVerification, error: null };
        } catch (error) {
          console.error("FAILED TO CREATE OtpVerification.", error.message);
          return { otpVerification: null, error: error.message };
        }
    },
    update: async function (user_id, data = {}) {
        if (!user_id) throw new Error("No user for update");
    
        try {
          const otpVerification = await prisma.otpVerification.update(
            {
              where: { user_id: user_id },
              data: {
                  ...data
              }
            });
          return { otpVerification, error: null };
        } catch (error) {
          console.error(error.message);
          return { user: null, message: error.message };
        }
    },
    get: async function (clause = {}) {
        try {
          const otpVerification = await prisma.otpVerification.findFirst({ where: clause });
          return otpVerification;
        } catch (error) {
          console.error("FAILED TO GET otpVerification.", error.message);
          return null;
        }
    },
    delete: async function(clause={}) {
      try {
        await prisma.otpVerification.delete({ where: clause });
        return true;
      } catch (error) {
        console.error("FAILED TO DELETE otpVerification.", error.message);
        return false;
      }
    }
}
module.exports = {
    otpVerification
}