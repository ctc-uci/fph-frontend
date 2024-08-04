export type Notification = {
  businessId: number;
  notificationId: number;
  message: string;
  timestamp: Date;
  type: string;
  senderId: number;
  businessName: string;
  donationId: number;
};

export type CreateNotificationArgs = {
  businessId: number;
  message: string;
  type: string;
  senderId: number;
  businessName: string;
  donationId: number;
};
