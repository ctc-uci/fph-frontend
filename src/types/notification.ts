export type Notification = {
  business_id: number;
  business_name: string;
  donation_id: number;
  message: string;
  notification_id: number;
  sender_id: number;
  timestamp: string;
  type: string;
};

export type CreateNotificationArgs = {
  businessId: number;
  message: string;
  timestamp: string;
  type: string;
  senderId: number;
  businessName: string;
  donationId: number;
};
