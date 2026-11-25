/** What the booking route knows about a meeting once Cal.com has created it. */
export type CalBookingRef = {
  uid: string;
  /** Cal Video join link (null if the event type uses another location). */
  meetingUrl: string | null;
  /** cal.com/booking/<uid> — where the attendee can reschedule or cancel. */
  manageUrl: string;
};
