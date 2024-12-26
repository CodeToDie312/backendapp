const prisma = require("../utils/prisma");
const Employee = {
    tablename: "Employee",
    writable: [
      'fullname',
      'employ_code',
      'position', 
      'birthday',
      'id_card_number', 
      'social_code',
      'address',
      'education',
      'level',
      'foreign_lang',
      'it_level',
      'join_clan',
      'nation',
      'sex',
      'date_join',
      'payday',
      'level_salary',
      'multiplier',
      'extend_salary',
      'link_file_id_card',
      'link_education',
      'link_contract',
    ],

    create: async function (data = {}) {
        try {
          const employee = await prisma.employee.create({
            data
          });
          return employee;
        } catch (error) {
          console.error("FAILED TO CREATE EMPLOYEE.", error.message);
          return { employee: null, error: error.message };
        }
    },

    get: async function (clause = {}) {
        try {
          const employee = await prisma.employee.findFirst({ where: clause });
          return employee;
        } catch (error) {
          console.error("FAILED TO GET EMPLOYEE.", error.message);
          return null;
        }
    },

    where: async function(clause= {}) {
      try {
        const employee = await prisma.employee.findMany({ where: {...clause} });
        return employee;
      } catch (error) {
        console.error("FAILED TO GET EMPLOYEE.", error.message);
        return null;
      }
    },
    
    all: async function () {
      try {
        const employee = await prisma.employee.findMany();
        return employee;
      } catch (error) {
        console.error("FAILED TO GET EMPLOYEE.", error.message);
        return null;
      }
    },

    update: async function (employ_code = null, data_update = {}) {
        if (!employ_code) throw new Error("No employee for update");
    
        try {
          const employee = await prisma.employee.update({
            where: { employ_code: employ_code },
            data: {
              ...data_update
            }
          });
          return employee;
        } catch (error) {
          console.error(error.message);
          return { employee: null, message: error.message };
        }
    },

    delete: async function (clause = {}) {
        try {
          await prisma.employee.delete({ where: clause });
          return true;
        } catch (error) {
          console.error("FAILED TO DELETE POSITION.", error.message);
          return false;
        }
    },
    whereString: async function(searchTerm) {
      try {
        const topic = await prisma.employee.findMany({
          where: {employ_code: { contains: searchTerm }},
        });
        return topic
      } catch (e){
        console.log(e)
        return null;
      }
    },
    groupBy: async function() {
      const employeesByYear = await prisma.employee.groupBy({
        by: ['date_join'],
        _count: {
          id: true,
        },
        orderBy: {
          date_join: 'desc',
        },
      });
      const result = employeesByYear.map(employee => {
        let parts = employee.date_join?.split("-"); 
        let year = parts ? parts[2] : ''; 
        return {
          year: year ? year : '2024',
          count: employee._count.id,
        };
      });
      return result;
    }
}
module.exports = { Employee };