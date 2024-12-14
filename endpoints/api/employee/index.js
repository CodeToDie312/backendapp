const { reqBody } = require("../../../utils/http");
const { Employee } = require("../../../models/employee");

function apiEmployeeEndpoints(app) {
    if (!app) return;
    app.get('/v1/employee/all', async (request, response) => {
        try {
            const employee = await Employee.all();
            response.status(200).json({employee: employee, error: null});
        } catch (e) {
            console.log('FAIL TO GET EMPLOYEE', e.message);
            response.status(500).message(e.message);
        }
    });
    app.post('/v1/employee/filter', async (request, response) => {
        try {
            const param = reqBody(request);
            const employee = await Employee.where(param);
            response.status(200).json({employee: employee, error: null});
        } catch (e) {
            console.log('FAIL TO GET EMPLOYEE', e.message);
            response.status(500).message(e.message);
        }
    });

    app.post('/v1/employee/create', async(request, response) => {
        try {
            const data = reqBody(request);
            const employee = await Employee.create(data);
            response.status(200).json({employee: employee, error: null})

        } catch (e) {
            console.log('FAIL TO CREATE EMPLOYEE', e.message);
            response.status(500).message(e.message)
        }
    })
    app.post('/v1/employee/update', async(request, response) => {
        try {
            const {data_update, employ_code} = reqBody(request);
            const employee = await Employee.update(employ_code, data_update);
            response.status(200).json({employee: employee, error: null})
        } catch (e) {
            console.log('FAIL TO UPDATE EMPLOYEE', e.message);
            response.status(500).message(e.message)
        }
    })
    app.post('/v1/employee/delete', async(request, response) => {
        try {
            const employ_code = reqBody(request);
            await Employee.delete(employ_code);
            response.status(200).message('DELETED SUCCESS')
        } catch (e) {
            console.log('FAIL TO DELETE EMPLOYEE', e.message);
            response.status(500).message(e.message)
        }
    })
}
module.exports = {
    apiEmployeeEndpoints
};