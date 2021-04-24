import { tipos } from "../types/tipos"

export const editFood = (id, food) => (
    {
        type: tipos.editFood,
        payload: {id, food}
    }
);
export const selectedFood = (id) => (
    {
        type: tipos.selectedFood,
        payload: id
    }
);
export const deleteFood = (id) => (
    {
        type: tipos.deleteFood,
        payload: {id}
    }
);
export const addFood = (food) => (
    {
        type: tipos.addFood,
        payload: food
    }
);