import { Recipe } from '../recipe.model';
import * as recipesActions from './recipes.actions';

export interface State{
    recipes : Recipe[];
}
export const initialState: State={
    recipes :[]
}

export function recipesReducer(state : State=initialState,action : recipesActions.recipesActionType){
    switch(action.type){
        case recipesActions.SET_RECIPES : 
            return {
                ...state,
                recipes : [...action.payload]
            }
        case recipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes,action.payload]
            }
        case recipesActions.UPDATE_RECIPE:
            const updatedRecipes=[...state.recipes];
            updatedRecipes[action.payload.index]=action.payload.newRecipe;
            return {
                ...state,
                recipes : updatedRecipes
            }
        case recipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes : state.recipes.filter((recipe,index)=>{
                    return index !== action.payload;
                })
            }
        default:
            return state;
    }
}