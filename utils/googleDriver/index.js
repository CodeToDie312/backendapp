const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

//Setting Google Auth2 client
const Oauth2 = google.auth.OAuth2;
const oauth2Client = new Oauth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)

const TOKEN_PATH = "file_have_token.json";

async function authenticate() {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oauth2Client.setCredentials(token);
}

async function uploadFileToDrive(filePath, fileName) {
    await authenticate();
    
    const drive = google.drive({version: 'v3', auth: oauth2Client});

    const fileMetadata = {
        name : fileName,
        parent : ['root']
    }

    const media = {
        mimeType: 'application/octet-stream',
        body: fs.createReadStream(filePath)
    }

    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink'
    })
    return response.data;
    
}
module.exports = { uploadFileToDrive }