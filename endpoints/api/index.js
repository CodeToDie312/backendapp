const { useSwagger } = require("../../swagger/utils");
const { apiUserEndpoints } = require("./users");
const { apiTopicEndpoints } = require("./topics");
const { apiProposalEndpoints} = require("./proposal");
const { apiEmployeeEndpoints} = require("./employee");

function developerEndpoints(app, router) {
    if (!router) return;
    useSwagger(app);
    apiUserEndpoints(router);
    apiTopicEndpoints(router);
    apiEmployeeEndpoints(router);
    apiProposalEndpoints(router);
}
module.exports = { developerEndpoints };