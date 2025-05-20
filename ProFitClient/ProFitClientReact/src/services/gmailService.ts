import axios from 'axios';
import { gapi } from 'gapi-script';

const CLIENT_ID = import.meta.env.VITE_REACT_APP_GMAIL_CLIENT_ID;
const API_KEY = import.meta.env.VITE_REACT_APP_GMAIL_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

class gmailService {
    static isInitialized = false;

    static async initClient() {
        if (this.isInitialized) return;

        return new Promise((resolve, reject) => {
            gapi.load('client:auth2', async () => {
                try {
                    await gapi.client.init({
                        apiKey: API_KEY,
                        clientId: CLIENT_ID,
                        scope: SCOPES,
                    });
                    this.isInitialized = true;
                    resolve(true);
                } catch (error) {
                    console.error('Error initializing Gmail client:', error);
                    reject(error);
                }
            });
        });
    }

    static async signIn() {
        try {
            await this.initClient();
            const authInstance = gapi.auth2.getAuthInstance();
            if (!authInstance.isSignedIn.get()) {
                await authInstance.signIn();
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            throw error;
        }
    }

    static async getAccessToken() {
        const authInstance = gapi.auth2.getAuthInstance();
        const user = authInstance.currentUser.get();
        const authResponse = user.getAuthResponse();
        return authResponse.access_token;
    }

    static async sendEmail(to: string, subject: string, body: string) {
        try {
            await this.initClient();
            await this.signIn();

            const accessToken = await this.getAccessToken();

            const encodedMessage = btoa(
                `From: me\nTo: ${to}\nSubject: ${subject}\n\n${body}`
            )
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');

            const response = await axios.post(
                'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
                {
                    raw: encodedMessage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Email sent:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

export default gmailService;