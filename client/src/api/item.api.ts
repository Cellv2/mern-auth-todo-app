import { Item } from "../types/to-do.types";

/**
 * Add items to DB through API
 * @param {Item[] | Item} items Items to add to the database
 * @param {string} token The current user token
 */
export const addItemsToDatabase = async (
    items: Item[] | Item,
    token: string
) => {
    // DB API currently expects an array, so we convert a single item to an array if needed
    let itemArray: Item[] = [];
    if (Array.isArray(items)) {
        itemArray = items;
    } else {
        itemArray.push(items);
    }

    const addRequest = await fetch(`/api/user/todos`, {
        method: "POST",
        headers: {
            Authorization: token,
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(itemArray),
    });

    const addResponse = await addRequest.json();

    return addResponse;
};

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
