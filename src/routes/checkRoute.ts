import express from 'express';

import { checkIn, checkInParams, CheckInResponse} from '../controller/checkinController';
import { authMiddleware } from '../middleware/authMiddleware';

const check = express.Router();

check.post('/', authMiddleware , checkIn  as (req: express.Request<checkInParams>, res: express.Response<CheckInResponse>) => void); 

export default check;
 