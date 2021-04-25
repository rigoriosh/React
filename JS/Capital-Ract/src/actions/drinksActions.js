import { tipos } from "../types/tipos"

export const editDrinks = (id, drink) => (
    {
        type: tipos.editDrink,
        payload: {id, drink}
    }
);
export const selectedDrink = (id) => (
    {
        type: tipos.selectedDrink,
        payload: id
    }
);
export const deleteDrink = (id) => (
    {
        type: tipos.deleteDrink,
        payload: {id}
    }
);
export const addDrink = (drink) => (
    {
        type: tipos.addDrink,
        payload: drink
    }
);