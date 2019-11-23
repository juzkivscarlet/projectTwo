require('dotenv').config();

module.exports = {
    web: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        project_id: process.env.GOOGLE_PROJECT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_CERT,
        client_secret: GOOGLE_CLIENT_SECRET
    }
};