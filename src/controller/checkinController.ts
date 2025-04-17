import { Request, Response } from "express";
import { Attendee } from "../model/attendeeModel";
import { CheckIn } from "../model/check";
import { checkInSchema } from "../schema/checkinschema";


export type checkInParams = {
  event_id: number;
  user_id: number;
};
export type messageResponse = { message: string };
export type CheckInResponse =
  | messageResponse
  | { error: string }
  | { message: string; checkin?: CheckIn };

export const checkIn = async (
  req: Request<checkInParams>,
  res: Response<CheckInResponse>
) => {
  try {
    //  const {event_id}  = checkInSchema.parse(req.body);
      //  const userId = req.body.user_id;
   
     const { user_id, event_id } = req.body;
    //  console.log('userId:', user_id);
    // console.log('event_id:', event_id);



    if (!user_id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const attendee = await Attendee.findOne({
      where: { user_id: user_id, event_id },
    });
    // console.log("attendee:", attendee);
    

    if (!attendee || attendee.registration_status !== "registered") {
      return res
        .status(400)
        .json({ message: "User is not registered for this event" });
    }

    const alreadyCheckedIn = await CheckIn.findOne({
      where: { attendee_id: attendee.id },
    });

    if (alreadyCheckedIn) {
      return res.status(400).json({ message: "User already checked in" });
    }

    const checkIn = await CheckIn.create({
      attendee_id: attendee.id,
      check_in_time: new Date(),
      event_id: event_id,
      user_id: user_id,
    });

    // console.log("Check-in successful:",checkIn);

    return res.status(200).json({ message: 'Check-in successful', checkin: checkIn });
    

    
  } catch (error: any) {
    console.error("Check-in error:", error);
    res.status(400).json({
      error:
        "Check-in failed. Check if eventId is valid and user is registered.",
    });
  }
};
