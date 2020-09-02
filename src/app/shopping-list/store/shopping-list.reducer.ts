import { Ingredient } from 'src/app/shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShoppingListAction from './shopping-list.actions';
export interface State{
    ingredients : Ingredient[];
    editedIngredient : Ingredient;
    editedIngredientIndex : number;
}

const initialstate : State={
    ingredients : [
        new Ingredient('Apples',5),
        new Ingredient('Oranges',10)
    ],
    editedIngredient : null,
    editedIngredientIndex : -1
}
export function ShoppingListReducer(state : State = initialstate,action : ShoppingListAction.ShoppingListAction1){
    switch(action.type){
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients : [
                    ...state.ingredients,
                    action.payload
                ]
            };
            case ShoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients : [
                    ...state.ingredients,
                    ...action.payload
                ]
            };
            case ShoppingListAction.UPDATE_INGREDIENT:
                const newIngredient = action.payload.ingredient;
                const updatedIngredients =[...state.ingredients];
                updatedIngredients[state.editedIngredientIndex]=newIngredient;
                return{
                    ...state,
                    ingredients : updatedIngredients,
                    editedIngredientIndex : -1,
                    editedIngredient : null
                };
            case ShoppingListAction.DELETE_INGREDIENT:
                return{
                    ...state,
                    ingredients : [...state.ingredients.filter((ingred,index)=>{
                        return index !== state.editedIngredientIndex;
                    })],
                    editedIngredientIndex : -1,
                    editedIngredient : null
                };
            case ShoppingListAction.START_EDIT:
                return {
                    ...state,
                    editedIngredient : {...state.ingredients[action.payload]},
                    editedIngredientIndex : action.payload
                };
            case ShoppingListAction.STOP_EDIT:
                return {
                    ...state,
                    editedIngredientIndex : -1,
                    editedIngredient : null
                }
            default:
                return state;
    }
}