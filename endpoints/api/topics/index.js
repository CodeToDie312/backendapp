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
            response.status(500).json(e.message);
        }
    });

    app.post('/v1/topic/filter', async (request, response) => {
        try {
            const param = reqBody(request);
            const topic = await Topic.where(param);
            response.status(200).json({topic: topic, error: null});
        } catch (e) {
            console.log('FAIL TO GET TOPIC', e.message);
            response.status(500).json(e.message);
        }
    });

    app.post('/v1/topic/create', async (request, response) => {
        try {
            const {data_create, student} = reqBody(request);
            const checkExist = await Topic.where(data_create.topic_code)
            if(checkExist){
                response.status(400).json("Topic code created, please enter other code")
            }
            const topic = await Topic.create(data_create, student);
            response.status(200).json({topic: topic, error: null});
        } catch (e) {
            console.log('FAIL TO GET TOPIC', e.message);
            response.status(500).json(e.message);
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
            response.status(500).json(e.message);
        }
    });
    
    app.post('/v1/topic/delete', async (request, response) => {
        try {
            const param = reqBody(request);
            await Topic.delete(param);
            response.status(200).json('DELETE TOPIC SUCCESSFUL');
        } catch (e) {
            console.log('FAIL TO DELETE TOPIC');
            response.status(500).json('FAIL TO DELETE TOPIC');
        }
    });

    app.post('/v1/topic/search', async (request, response) => {
        const searchTerm = reqBody(request);
      
        if (!searchTerm) {
          return response.status(400).send({ message: 'Need Key Search' });
        }
      
        try {
          const topic = await Topic.whereString(searchTerm.topic_code)
      
          if (topic.length === 0) {
            return response.status(404).send({ message: 'No Topic match' });
          }
      
          response.status(200).json(topic);
        } catch (error) {
          console.error(error);
          response.status(500).json("FAIL TO SEARCH");
        }
      });
}
module.exports = { apiTopicEndpoints };