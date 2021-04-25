import { tipos } from "../types/tipos";

const initialState =
{
    drinks: [
        /* {
            idDrink: 1,
            name: 'Aguila',
            price: 3500,
            description: '350mm',
            categoryDrink: 'Cerveza',
            quantity: 50,                
            color:'',
            imagen: ''
        },
        {
            idDrink: 2,
            name: 'Poker',
            price: 3500,
            description: '350mm',
            idCategoria: Number,
            idTipoCateg: Number,
            quantity: 50,                
            color:'',
            imagen: ''
        } */
    ],
    idDrinkSelected: '',
    categorias: [
        {
            idCategoria: 'Drinks',
            nombreCategoria: 'Drinks',
            tipos: [
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Cerveza'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Aguardiente'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Ron'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Thequila'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Whisquy'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Vinos'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Coptel'
                }
            ]
        },
        {
            idCategoria: 'Coffes',
            nombreCategoria: 'Coffe',
            tipos: [
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Tinto'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Moca'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Late'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Expresso'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Granizado'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Jugos'
                },
                {
                    idTipoCateg: Math.random(),
                    nameTipo: 'Milo'
                }
            ]
        },
        {
            idCategoria: 'Foods',
            nombreCategoria: 'Foods',
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
        }
    ]

}

export const drinksReducer = (state = initialState, action) => {
    console.log(action);
    let i = 0;
    switch (action.type) {
        case tipos.addDrink:
            state.drinks.push(action.payload);
            return state;
        case tipos.editDrink:
            state.idDrinkSelected = '';
            i = state.drinks.findIndex(e => e.idDrink === action.payload.idDrink)
            console.log(i)
            state.drinks[i] = action.payload.drink;
            return state;
        case tipos.selectedDrink:
            state.idDrinkSelected = action.payload;
            return state;
        case tipos.deleteDrink:
            //state.idDrinkSelected = '';            
            i = state.drinks.findIndex(e => e.idDrink === action.payload.idDrink)
            console.log(i)
            if (i > -1) {
                state.drinks.splice(i, 1);
            }
            return state;
        default:
            return state;
    }
}
