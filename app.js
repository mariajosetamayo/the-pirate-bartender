//<-- Object constructors -->

var Question= function(question){
	this.question = question
}

var Ingredients= function(ingredients){
	this.ingredients= ingredients
}

var Pantry= function(availableIngredients){
	this.availableIngredients = availableIngredients
}

var Bartender= function(pirate){
	this.pirate= pirate
}

// <-- Object methods -->
Bartender.prototype.createDrink= function(ingredientsPreference){
	console.log("ingredients input", ingredientsPreference)
	var drink= ingredientsPreference.map(function(item){
		return item[Math.floor(Math.random()*item.length)]
		console.log(drink)
	})	
	return drink
}

//<-- Objects -->

// <-- Question Objects -->
var question1= new Question("Do ye like yer drinks strong?")
var question2= new Question("Do ye like it with a salty tang?")
var question3= new Question("Are ye a lubber who likes it bitter?")
var question4= new Question("Would ye like a bit of sweetness with yer poison?")
var question5= new Question("Are ye one for a fruity finish?")

// <-- Ingredients objects -->
var strongIngredients= new Ingredients(["glug of rum", "slug of whisky", "splash of gin"])
var saltyIngredients= new Ingredients(["olive on a stick", "salt-dusted rim", "rasher of bacon"])
var bitterIngredients= new Ingredients(["shake of bitters", "splash of tonic", "twist of lemon peel"])
var sweetIngredients= new Ingredients(["sugar cube", "spoonful of honey", "splash of cola"])
var fruityIngredients= new Ingredients(["slice of orange", "dash of cassis", "cherry on top"])

// <-- Pantry objects -->
var pantryIngredients= new Pantry([strongIngredients.ingredients, saltyIngredients.ingredients, bitterIngredients.ingredients, sweetIngredients.ingredients, fruityIngredients.ingredients])

// Bartender object
var theBartender= Object.create(Bartender.prototype)

//<-- State object which saves the user's preferences -->

var state= {
	yesStrong: false,
	yesSalty: false,
	yesBitter: false,
	yesSweet: false,
	yesFruity: false,
	ingredientsPreference:[],
}

//<-- state modification functions -->

var chosenIngredients = function(state, chosen){
	if(chosen === state.yesStrong){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[0])
	}else if(chosen === state.yesSalty){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[1])
	}else if(chosen === state.yesBitter){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[2])
	}
	else if(chosen === state.yesSweet){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[3])
	}
	else if(chosen === state.yesFruity){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[4])
	}
}

// <-- Function to create an array of questions and determine the current question -->
var presentQuestion = function(questionIndex){
    window.arrayQuestions = []
    window.arrayQuestions.push(question1.question, question2.question, question3.question, question4.question, question5.question)
    window.currentQuestion = arrayQuestions[questionIndex]
}

// <-- Counter function to keep track of question number -->
var questionIndex = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

// <-- render content in the DOM -->

var renderQuestion= function(state, element){
	var questionHTML= "<h2>" + window.currentQuestion + "</h2>"
	element.html(questionHTML)
}

// <-- jQuery functions to modify the DOM -->

$(".yesBtn").on("click", function(event){
	event.preventDefault()
	console.log("this is running")
	var index= questionIndex()
	presentQuestion(index)
	renderQuestion(state, $(".question"))
})

$(".noBtn").on("click", function(event){
	event.preventDefault()
	console.log("this is running")
	var index= questionIndex()
	presentQuestion(index)
	renderQuestion(state, $(".question"))
})

$(document).ready(function(){
	presentQuestion(0)
	renderQuestion(state, $(".question"))
})










