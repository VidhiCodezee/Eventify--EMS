import express from 'express';
import { registerForEvent, cancelRegistration } from '../controller/attendeeController';
import { authMiddleware } from '../middleware/authMiddleware'; 


const attendee = express.Router();

attendee.use(authMiddleware);

attendee.post('/register', authMiddleware, registerForEvent as unknown as (req: express.Request, res: express.Response) => void);


attendee.post('/cancel', authMiddleware, cancelRegistration as unknown as (req: express.Request, res: express.Response) => void); 

export default attendee;