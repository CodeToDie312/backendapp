const prisma = require("../utils/prisma");
const otpVerification = {
    tablename: 'OtpVerification',
    writable: [],

    create: async function (data = {}) {
        try {
          const otpVerification = await prisma.otpVerification.create({
            data: {
                data,
            },
          });
          return { otpVerification, error: null };
        } catch (error) {
          console.error("FAILED TO CREATE OtpVerification.", error.message);
          return { otpVerification: null, error: error.message };
        }
    },
    update: async function (user_id = null, data = {}) {
        if (!id) throw new Error("No user for update");
    
        try {
          const otpVerification = await prisma.otpVerification.update({
            where: { user_id },
            data,
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
}
module.exports = {
    otpVerification
}