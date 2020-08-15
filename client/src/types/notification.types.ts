export type NotificationTypes = "Success" | "Error";

export interface Notification {
    type: NotificationTypes | null;
    message: string | null;
}
