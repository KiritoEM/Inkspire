import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

export default googleClient;