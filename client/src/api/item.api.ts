import { Item } from "../types/to-do.types";

export const getItemsFromDatabase = async (token: string) => {
    const getRequest = await fetch(`/api/user/todos`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });
    const dbItems: Item[] = await getRequest.json();

    return dbItems;
};

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
    const deleteRequest = await fetch(`/api/user/todos/${item._id}`, {
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

/**
 * Updates item in the DB
 * @param {Item} item Entire item to update in the DB
 * @param {string} token The current user token
 * @return {Item} The updated item from the database
 */
export const updateItemInDatabase = async (item: Item, token: string) => {
    const updateRequest = await fetch(`/api/user/todos/${item._id}`, {
        method: "PUT",
        headers: {
            Authorization: token,
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(item),
    });

    const updatedItem: Item = await updateRequest.json();

    return updatedItem;
};
