const data = require('../data.json')

exports.index = (request, response)=>{
    return response.render('Site/index', { Recipes: data.recipes })
}

exports.recipes = (request, response) => {
    //console.log(dataRecipes.findIndex( (recipe)=>{ return recipe.title === 'Asinhas de frango ao barbecue'} ))
    /*
    function reducer(receita, index){
        
        return {...receita, id: index}
    }
    const receitasIndices = receita.map( reducer, [] )*/
    
    const receitasComIndices = data.recipes.map( (receita, index) => {
        return {...receita, id: index}
    } )
    return response.render('Site/recipes', { Recipes: receitasComIndices })
}

exports.recipe = (request, response) => {
    const recipeIndex = request.params.index
    const recipe = data.recipes[recipeIndex]
    return response.render('Site/recipe', { recipe } ) //res.send(recipe) //
}

exports.about = (request, response) => {
    return response.render('Site/about')
}