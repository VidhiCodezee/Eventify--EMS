import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controller/eventController';
import { authMiddleware } from '../middleware/authMiddleware';
import { EventParams ,ErrorResponse} from '../controller/eventController';

const eventRouter = express.Router();
eventRouter.use(authMiddleware);

eventRouter.post('/',authMiddleware, createEvent);
eventRouter.get('/view',authMiddleware,getEvents);
eventRouter.put('/:id',authMiddleware, updateEvent as (req: express.Request<EventParams>, res: express.Response<ErrorResponse | Event>) => void);
eventRouter.delete('/:id',authMiddleware, deleteEvent  as (req: express.Request<EventParams>, res: express.Response<ErrorResponse | Event>) => void);

export default eventRouter;
