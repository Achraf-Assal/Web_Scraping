"use strict";
const User_Agent = (customUserAgent) => {
    const config = {
        headers: {
            'User-Agent': customUserAgent,
        }
    };
    return config;
};
