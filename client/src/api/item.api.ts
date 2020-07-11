import { Item } from "../types/to-do.types";

export const deleteItemFromDatabase = async (item: Item, token: string) => {
    const deleteRequest = await fetch(`/api/users/todos/${item._id}`, {
        method: "DELETE",
        headers: {
            Authorization: token,
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(item),
    });

    const response = await deleteRequest;

    return response;
};
