function getGoogleAuth(){

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    }

    const qs = new URLSearchParams(options)
    console.log(qs.toString());
    return `${rootUrl}?${qs.toString()}`
}


export default getGoogleAuth;