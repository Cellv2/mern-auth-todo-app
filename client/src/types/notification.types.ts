export type NotificationTypes = "Success" | "Error";

export type Notification = {
    type: NotificationTypes | null;
    heading?: string | null;
    message: string | null;
}
