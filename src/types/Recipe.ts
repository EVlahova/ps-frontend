export interface IRecipe {
	recipeId: number,
	name: string,
	products: string,
	description: string,
	whoUserId: number,
	active: boolean,
	deleted: boolean
}
