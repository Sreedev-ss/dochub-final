import express, { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

const app = express();

const serverMappings: Record<string, string> = {
    '/auth': 'http://auth-server:8001',
    '/doctor': 'http://doctor-server:8000/doc',
    '/payment': 'http://payment-server:8002',
};

const determineServerURL = (url: string): string | null => {
    const matchingPrefix = Object.keys(serverMappings).find((prefix) =>
        url.startsWith(prefix)
    );
    return matchingPrefix ? serverMappings[matchingPrefix] : null;
};

app.all('/*', async (req: Request, res: Response) => {
    const serverURL = determineServerURL(req.url);
    if (serverURL) {
        const url = `${serverURL}${req.url}`;
        const config: AxiosRequestConfig = {
            method: req.method as AxiosRequestConfig['method'],
            url,
            data: req.body,
            headers:{
                Authorization:req.headers?.authorization
            }
        };
        try {
            const response = await axios(config);
            res.status(response.status).json(response.data);
        } catch (error) {            
            res.status(500).json({message:error?.response?.data});
        }
    } else {
        res.status(404).json({ message: 'Server not found' });
    }
});

export default app

