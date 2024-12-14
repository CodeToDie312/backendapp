const prisma = require("../utils/prisma");
const Proposal = {
    tablename: "Proposal",
    writable: [
        'name_proposal',
        'proposal_code',
        'date_created',
        'signer',
        'status',
    ],

    create: async function (data_create = {}, version = {}) {
        try {
            const proposal = await prisma.proposal.create({
            data: {
                name_proposal: data_create.name_proposal,
                proposal_code: data_create.proposal_code,
                date_created: data_create.date_created,
                signer: data_create.signer,
                status: data_create.status,
                version: {
                    create: version.map(item => ({
                            name_version: item.name_version,
                            date_version_created: item.date_version_created,
                            signer_version: item.signer_version,
                            fwd: item.fwd
                    }))
                }
            },
          });
          return proposal ;
        } catch (error) {
          console.error("FAILED TO CREATE PROPOSAL.", error.message);
          return { proposal: null, error: error.message };
        }
    },

    get: async function (clause = {}) {
        try {
          const proposal = await prisma.proposal.findFirst({ 
            where: clause,
            include: {
                version: true,
            },
        });
          return proposal;
        } catch (error) {
          console.error("FAILED TO GET PROPOSAL.", error.message);
          return null;
        }
    },

    where: async function(clause= {}) {
        try {
          const proposal = await prisma.proposal.findMany({ 
            where: clause,
            include: {
                version: true
            }
        });
          return proposal;
        } catch (error) {
          console.error("FAILED TO GET PROPOSAL.", error.message);
          return null;
        }
    },

    all: async function () {
        try {
          const proposal = await prisma.proposal.findMany({
            include: {
                version: true,
            },
          });
          return proposal;
        } catch (error) {
          console.error("FAILED TO GET PROPOSAL.", error.message);
          return null;
        }
    },


    update: async function (proposal_code = null, data_update = {}, version = {}) {
        if (!proposal_code) throw new Error("No proposal for update");
    
        try {
          const proposal = await prisma.proposal.update({
            where: { proposal_code },
            data:{
                ...data_update,
                version: {
                    update: {
                        where: {proposal_code : proposal_code},
                        data: {
                            name_proposal: version.name_proposal,
                            proposal_code: version.proposal_code,
                            date_created: version.date_created,
                            signer : version.signer,
                            fwd: version.fwd
                        }
                    }
                    
                }
            },
          });
          return { proposal, error: null };
        } catch (error) {
          console.error(error.message);
          return { proposal: null, message: error.message };
        }
    },

    delete: async function (clause = {}) {
        try {
          await prisma.proposal.delete({ where: clause });
          return true;
        } catch (error) {
          console.error("FAILED TO DELETE PROPOSAL.", error.message);
          return false;
        }
    },
    update_link : async function (proposal_code = null, link = {}, version_link = {}) {
        if (!topic_code) throw new Error("No Topic for update");

        try {
            await prisma.proposal.update({
              where: { proposal_code },
              data: { 
                    link,
                    version: {
                        update: version_link.map(item => ({
                            where: {proposal_code : proposal_code},
                            update: {
                                link_file_not_sign: item.link_file_not_sign,
                                link_file_report_proposal: item.link_file_report_proposal
                            }
                        }))
                    }
                },
            });
            return { message: "SUCCESS SAVE LINK FILE", error: null };
          } catch (error) {
            console.error(error.message);
            return { message: error.message };
          }
    }
}
module.exports = { Proposal }