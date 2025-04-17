import { Request, Response } from 'express';
import { Attendee } from '../model/attendeeModel';
import { Event } from '../model/eventModel';
import { attendeeRegisterSchema } from '../schema/atendeeschema';
// import { messageResponse } from './AuthController';

export type AttendeeParams = {
  event_id: number;
  userId: string;
};
export type messageResponse = { message: string };
export type AttendeeResponse = messageResponse | Attendee[] | Attendee | { message: string, attendee?: Attendee };

export const registerForEvent = async (req: Request<AttendeeParams>, res: Response<AttendeeResponse>) => {
  try {
    const { event_id } = attendeeRegisterSchema.parse(req.body);
    const userId = req.params.userId;

    const event = await Event.findByPk(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const existing = await Attendee.findOne({ where: { user_id: userId, event_id } });
    if (existing) return res.status(400).json({ message: 'Already registered for this event' });

    const attendee = await Attendee.create({
      user_id: userId,
      event_id,
      registration_status: 'registered',
    });

    res.status(201).json(attendee);
  } catch (message: any) {
    res.status(400).json({ message: message?.messages || message.message });
  }
};

export const cancelRegistration = async (req: Request<AttendeeParams>, res: Response<AttendeeResponse>) =>{
  try {
    const { event_id } = attendeeRegisterSchema.parse(req.body);
    const userId = req.params.userId;

    const attendee = await Attendee.findOne({ where: { user_id: userId, event_id } });

    if (!attendee) {
      return res.status(404).json({ message: 'You are not registered for this event' });
    }

    if (attendee.registration_status === 'cancelled') {
      return res.status(400).json({ message: 'Registration already cancelled' });
    }

    attendee.registration_status = 'cancelled';
    await attendee.save();

    res.status(200).json({ message: 'Registration cancelled successfully', attendee}); 
    

  
  } catch (message: any) {
    res.status(400).json({ message: message?.messages || message.message });
  }
};
