const { empty } = require("@prisma/client/runtime/library");
const prisma = require("../utils/prisma");
const Topic = {
    tablename: "Topic",
    writable: [
        'name_topic',
        'version',
        'type',
        'unit',
        'level_manager',
        'burget',
        'year'
    ],

    create: async function (data_create = {}, student= []) {
        try {
            const topic = await prisma.topic.create({
                data: {
                    name_topic: data_create.name_topic,
                    version: data_create.version, 
                    topic_code: data_create.topic_code,
                    type: data_create.type,
                    unit: data_create.unit,
                    level_manager: data_create.level_manager,
                    burget: data_create.burget,
                    year: data_create.year,
                    student: {
                        create: student.map(item => ({
                                fullname: item.fullname, 
                                student_code: item.student_code,
                                position_name: item.position_name
                        }))
                        
                    }
                }
            });
          return { message: "SUCCESS ADD TOPIC", error: null };
        } catch (error) {
          console.error("FAILED TO CREATE TOPIC.", error.message);
          return { topic: null, error: error.message };
        }
    },

    get: async function (clause = {}) {
        try {
          const topic = await prisma.topic.findFirst({ 
            where: clause,
            include: {
                student: true,
            },
        });
          return topic;
        } catch (error) {
          console.error("FAILED TO GET TOPIC.", error.message);
          return null;
        }
    },

    where: async function(clause= {}) {
        try {
          const topic = await prisma.topic.findMany({ 
            where: clause,
            include: {
                student: true
            }
        });
          return topic;
        } catch (error) {
          console.error("FAILED TO GET TOPIC.", error.message);
          return null;
        }
    },

    all: async function () {
        try {
          const topic = await prisma.topic.findMany({
            include: {
                student: true
            }
          });
          return topic;
        } catch (error) {
          console.error("FAILED TO GET TOPIC.", error.message);
          return null;
        }
    },

    update: async function (topic_code, data_update = {}) {
        if (!topic_code) throw new Error("No Topic for update");
        try {
          const topic = await prisma.topic.update({
            where: { topic_code: topic_code },
            data:{
                ...data_update
            },
          });
          return topic;
        } catch (error) {
          console.error(error.message);
          return { topic: null, message: error.message };
        }
    },

    delete: async function (clause = null) {
        try {
          await prisma.topic.delete({ where: clause});
          return true;
        } catch (error) {
          console.error("FAILED TO DELETE TOPIC.", error.message);
          return false;
        }
    },
    update_link : async function (topic_code = null, link = {}) {
        if (!topic_code) throw new Error("No Topic for update");

        try {
            const topic = await prisma.topic.update({
              where: { topic_code },
              data: { link },
            });
            return { message: "SUCCESS SAVE LINK FILE", error: null };
          } catch (error) {
            console.error(error.message);
            return { topic: null, message: error.message };
          }
    }
}
module.exports = { Topic }