export type Notification = {
  businessId: number;
  notificationId: number;
  message: string;
  timestamp: Date;
  beenDismissed: boolean;
  type: string;
  senderId: number;
  businessName: string;
  donationId: number;
};
