import { Request, Response } from 'express';
import { Event } from '../model/eventModel';
import {eventSchema } from '../schema/eventschema';
import { promises } from 'dns';
import { error } from 'console';
export type EventParams = {
  id: number;
  userId: number;
  // created_by: number;
}
export type ErrorResponse = {
  message: string;
}


export const createEvent = async ( req: Request<EventParams>,
  res: Response<ErrorResponse | Event>) => {
  try {
    const validatedBody = eventSchema.parse(req.body);  // Validate with Zod
    const userId = req.params.userId;
    const event = await Event.create({ ...validatedBody, created_by: userId });
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : String(error) });
  }
};

export const getEvents = async (req: Request<EventParams>, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const events = await Event.findAndCountAll({ where: { created_by: userId }, offset, limit, order: [['start_time', 'ASC']] });
  res.json({
    total: events.count,
    page,
    data: events.rows,
  });
};


 

export const updateEvent = async (req: Request<EventParams>, res: Response<ErrorResponse | Event>) => {
  const { id } = req.params;
  const userId = req.params.userId;

  try { 
    const event = await Event.findByPk(id);

    if (!event || event.created_by !== userId) {
      return res.status(404).json({ message: 'Event not found or unauthorized' });
    }

    await event.update(req.body); 

    return res.status(200).json(event);
  } catch (error) {
    console.error('Update failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteEvent = async (req: Request<EventParams>,res: Response<ErrorResponse | Event>)=> {
  const { id ,userId} = req.params;

  const event = await Event.findByPk(id);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  if (event.created_by !== userId) {
    return res.status(403).json({ message: 'Unauthorized to delete this event' });
  }

  await event.destroy();
  return res.status(204).json({  message: 'Event deleted successfully' });
};
