const { reqBody } = require("../../../utils/http");
const { Topic } = require("../../../models/topic");

function apiTopicEndpoints(app) {

    if (!app) return;

    app.get('/v1/topic/all', async (_, response) => {
        try {
            const topic = await Topic.all();
            response.status(200).json({topic: topic, error: null});
        } catch (e) {
            console.log('FAIL TO GET TOPIC', e.message);
            response.status(500).message(e.message);
        }
    });

    app.post('/v1/topic/filter', async (request, response) => {
        try {
            const param = reqBody(request);
            const topic = await Topic.where(param);
            response.status(200).json({topic: topic, error: null});
        } catch (e) {
            console.log('FAIL TO GET TOPIC', e.message);
            response.status(500).message(e.message);
        }
    });

    app.post('/v1/topic/create', async (request, response) => {
        try {
            const {data_create, student} = reqBody(request);
            console.log(student);
            const topic = await Topic.create(data_create, student);
            response.status(200).json({topic: topic, error: null});
        } catch (e) {
            console.log('FAIL TO GET TOPIC', e.message);
            response.status(500).message(e.message);
        }
    });

    app.post('/v1/topic/update', async (request, response) => {
        try {
            const { topic_code, data_update } = reqBody(request);
            const topic = await Topic.update(
                topic_code, 
                data_update
            );
            response.status(200).json({topic: topic, error: null});
        } catch (e) {
            console.log('FAIL TO UPDATE TOPIC', e.message);
            response.status(500).message(e.message);
        }
    });
    
    app.post('/v1/topic/delete', async (request, response) => {
        try {
            const topic_code = reqBody(request);
            await Topic.delete({topic_code});
            response.status(200).message('DELETE TOPIC SUCCESSFUL');
        } catch (e) {
            console.log('FAIL TO UPDATE TOPIC', e.message);
            response.status(500).message(e.message);
        }
    });
}
module.exports = { apiTopicEndpoints };