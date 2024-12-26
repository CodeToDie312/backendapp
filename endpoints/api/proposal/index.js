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
            response.status(500).json(e.message);
        }
    });
    app.post('/v1/proposal/filter', async (request, response) => {
        try {
            const param = reqBody(request);
            const proposal = await Proposal.where(param);
            response.status(200).json({proposal: proposal, error: null});
        } catch (e) {
            console.log('FAIL TO GET PROPOSAL', e.message);
            response.status(500).json(e.message);
        }
    });
    app.post('/v1/proposal/create', async (request, response) => {
        try {
            const {data_create, version} = reqBody(request);
            const checkExist = await Proposal.where(data_create.proposal_code)
            if(checkExist){
                response.status(400).json("Proposal code created, please enter other code")
            }
            const proposal = await Proposal.create(data_create, version);
            response.status(200).json({proposal: proposal, error: null});
        } catch (e) {
            console.log('FAIL TO CREATE PROPOSAL', e.message);
            response.status(500).json(e.message);
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
            response.status(500).json(e.message);
        }
    });
    app.post('/v1/proposal/delete', async (request, response) => {
        try {
            const proposal_code = reqBody(request);
            await Proposal.delete(proposal_code);
            response.status(200).json('DELETE PROPOSAL SUCCESSFUL');
        } catch (e) {
            console.log('FAIL TO DELETE PROPOSAL', e.message);
            response.status(500).json(e.message);
        }
    });
    app.post('/v1/proposal/search', async (request, response) => {
        const searchTerm = reqBody(request);
      
        if (!searchTerm) {
          return response.status(400).send({ message: 'Need Key Search' });
        }
      
        try {
          const proposal = await Proposal.whereString(searchTerm.proposal_code)
      
          if (proposal.length === 0) {
            return response.status(404).send({ message: 'No Proposal match' });
          }
      
          response.status(200).json(proposal);
        } catch (error) {
          console.error(error);
          response.status(500).json("FAIL TO SEARCH");
        }
      });
}
module.exports = {
    apiProposalEndpoints
};