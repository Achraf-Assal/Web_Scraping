const User_Agent = ( customUserAgent:string ) => {
    const config = {
        headers: {
            'User-Agent': customUserAgent,
        }
    };
    return config;
}

