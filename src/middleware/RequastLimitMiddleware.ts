import {lastRequestTimes} from "../GlobalVar";

 const rateLimitMiddleware = () => (req: any, res: any, next: any) => {
    const ip = req.ip; // You might need to adjust this based on your application's structure
  
    // Check if the user made a request within the last 60 seconds
    if (lastRequestTimes[ip] && Date.now() - lastRequestTimes[ip] < 10000) {
      return res.status(429).json({ error: 'Too Many Requests' });
    }
  
    // Record the time of the current request
    lastRequestTimes[ip] = Date.now();
  
    // Continue with the request
    next();
  };

  export default rateLimitMiddleware;