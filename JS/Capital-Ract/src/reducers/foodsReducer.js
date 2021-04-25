import { tipos } from "../types/tipos";

const initialState = {foods:[], idSelected: '',
    categorias: [
        {
            idCategoria: Math.random(),
            nombreCategoria: 'Calientes',
            tipos: [
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Empanadas de pollo'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Empanadas de Carne'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Empanadas de pollo y huevo'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Empanadas de Champiñones'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Chicharrones'
                }
            ]
        },
        {
            idCategoria: Math.random(),
            nombreCategoria: 'Frias',
            tipos: [
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Chocorramo'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Ducales'
                }
            ]
        }
    ]
};
export const foodsReducer = (state = initialState, action) => {
    let i = 0;
    switch (action.type) {
        case tipos.addFood:
            state.foods.push(action.payload);
            return state;
        case tipos.editFood:
            state.idSelected = '';
            i = state.foods.findIndex(e => e.id === action.payload.id)
            console.log(i)
            state.foods[i] = action.payload.food;
            return state;
        case tipos.selectedFood:
            state.idSelected = action.payload;
            return state;
        case tipos.deleteFood:            
            i = state.foods.findIndex(e => e.id === action.payload.id)
            console.log(i)
            if (i > -1) {
                state.foods.splice(i, 1);
            }
            return state;
        default:
            return state;
    }
}
