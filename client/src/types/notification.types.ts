export type NotificationTypes = "Success" | "Error" | null;

export interface Notification {
    type: NotificationTypes;
    message: string | null;
}
