const { reqBody } = require("../../../utils/http");
const { Proposal } = require("../../../models/proposal");

function apiProposalEndpoints(app) {
    if (!app) return;
    app.get('/v1/proposal/all', async (request, response) => {
        try {
            const proposal = await Proposal.all();
            response.status(200).json({proposal: proposal, error: null});
        } catch (e) {
            console.log('FAIL TO GET PROPOSAL', e.message);
            response.status(500).message(e.message);
        }
    });
    app.post('/v1/proposal/filter', async (request, response) => {
        try {
            const param = reqBody(request);
            const proposal = await Proposal.where(param);
            response.status(200).json({proposal: proposal, error: null});
        } catch (e) {
            console.log('FAIL TO GET PROPOSAL', e.message);
            response.status(500).message(e.message);
        }
    });
    app.post('/v1/proposal/create', async (request, response) => {
        try {
            const {data_create, version} = reqBody(request);
            console.log(data_create, version)
            const proposal = await Proposal.create(data_create, version);
            response.status(200).json({proposal: proposal, error: null});
        } catch (e) {
            console.log('FAIL TO CREATE PROPOSAL', e.message);
            response.status(500).message(e.message);
        }
    });
    app.post('/v1/proposal/update', async (request, response) => {
        try {
            const {proposal_code , data_update , version } = reqBody(request);
            const proposal = await Proposal.update(
                proposal_code,
                data_update, 
                version
            );
            response.status(200).json({proposal: proposal, error: null});
        } catch (e) {
            console.log('FAIL TO UPDATE PROPOSAL', e.message);
            response.status(500).message(e.message);
        }
    });
    app.post('/v1/proposal/delete', async (request, response) => {
        try {
            const proposal_code = reqBody(request);
            await Proposal.delete({proposal_code});
            response.status(200).message('DELETE PROPOSAL SUCCESSFUL');
        } catch (e) {
            console.log('FAIL TO DELETE PROPOSAL', e.message);
            response.status(500).message(e.message);
        }
    });
}
module.exports = {
    apiProposalEndpoints
};