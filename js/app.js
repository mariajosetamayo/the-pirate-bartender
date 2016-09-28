// Object constructors
var Question= function(question){
	this.question = question
}

var Ingredients= function(ingredients){
	this.ingredients = ingredients
}

var Bartender= function(pirate){
	this.pirate = pirate
}


////////// 1. Global Objects //////////

// State object which saves the user's preferences
var state= {
	currentQuestionIndex:0 ,
	userPreferences: []
}

// Question Objects
var question1= new Question("Do ye like yer drinks strong?")
var question2= new Question("Do ye like it with a salty tang?")
var question3= new Question("Are ye a lubber who likes it bitter?")
var question4= new Question("Would ye like a bit of sweetness with yer poison?")
var question5= new Question("Are ye one for a fruity finish?")
var arrayQuestions = []
arrayQuestions.push(question1.question, question2.question, question3.question, question4.question, question5.question);

// Ingredients objects
var strongIngredients= new Ingredients(["glug of rum", "slug of whisky", "splash of gin"])
var saltyIngredients= new Ingredients(["olive on a stick", "salt-dusted rim", "rasher of bacon"])
var bitterIngredients= new Ingredients(["shake of bitters", "splash of tonic", "twist of lemon peel"])
var sweetIngredients= new Ingredients(["sugar cube", "spoonful of honey", "splash of cola"])
var fruityIngredients= new Ingredients(["slice of orange", "dash of cassis", "cherry on top"])

// Pantry objects
var pantryIngredients = [strongIngredients.ingredients, saltyIngredients.ingredients, bitterIngredients.ingredients, sweetIngredients.ingredients, fruityIngredients.ingredients];

// Bartender object
var pirateBartender= Object.create(Bartender.prototype)

// cocktail names object
var cocktailNames = {
	adjectives: ["Fluffy", "Salty", "Illegal", "Infamous", "Ferocious", "Vicious", "Ruthless"],
	nouns: ["Vessel", "Mate", "Cannon", "Ship", "Maggot", "Ruffian", "Parrot"],
	nameAdjective: function(){
		return cocktailNames.adjectives[Math.floor(Math.random()*cocktailNames.adjectives.length)]
	},
	nameNoun: function(){
		return cocktailNames.nouns[Math.floor(Math.random()*cocktailNames.nouns.length)]
	},
}



////////// 2. Bartender functions //////////

// method shared by all bartenders that takes the ingredients from the user's preferences randomly and creates a drink
Bartender.prototype.createDrink= function(state){
	console.log("Making drink")

	var drink = state.userPreferences.map(function(index){
		var ingredientCategory = pantryIngredients[index] // ["slice of orange", "dash of cassis", "cherry on top"]
		return ingredientCategory[Math.floor(Math.random()*ingredientCategory.length)]
	})
	console.log(drink);
	return drink
}

// Function that creates a name for cocktails
var cocktailNameCreator = function(adjective, noun){
	var cocktailAdjective = adjective;
	var cocktailNoun = noun;
	var cocktailName = cocktailAdjective+ " " +cocktailNoun;
	return cocktailName
}

// Function to create an array of questions and determine the current question
var currentQuestion = function(state){
	return arrayQuestions[state.currentQuestionIndex];
}


////////// 2. Render content in the DOM //////////

// function to render the current question in the DOM
var renderCurrentQuestion = function (){
	var question = currentQuestion(state)
	var questionHTML= "<h2>"+question+"</h2>"
	$(".question").html(questionHTML)
}

// function to render the drink created by the bartender in the DOM
var renderDrink = function(){
	var drinkHTML = window.pirateDrink.map(function(item){
		return "<li>"+item+"</li>"
	})
	$(".drinkIngredients").html(drinkHTML)
}

// Function to render the drink's name
var renderDrinkName= function(cocktailRandomName){
	var drinkNameHTML= "<h2>The "+cocktailRandomName+"</h2>"
	$(".drinkName").html(drinkNameHTML)
}

// Function to render error
var renderError= function(element){
	var errorHTML= "<h2>So ye got no scurvy pirate taste! Goodby!</h2>"
	element.html(errorHTML)
}

// jQuery functions to modify the DOM
var showResults= function(){
	$(".questionContainer").hide()
	$(".drinkContainer").show()
}
var showQuestions= function(){
	$(".questionContainer").show()
	$(".drinkContainer").hide()
}

// Event listner for yes button. Calls functions and methods to create a drink and renders content into the DOM
$(".yesBtn").on("click", function(event){
	event.preventDefault();
	// Guardar los indexes de las categorias que el usuario eligio en un array.
	state.userPreferences.push(state.currentQuestionIndex);
	userChosePreference();
})
// event listner for no button. Renders the next question
$(".noBtn").on("click", function(event){
	event.preventDefault()
	userChosePreference();
})

userChosePreference = function(){
	state.currentQuestionIndex++;
	if(state.currentQuestionIndex < arrayQuestions.length){
		renderCurrentQuestion(state)
	}
	if(state.currentQuestionIndex === arrayQuestions.length){
		makeDrink()
	}
}

var makeDrink = function(){
	var pirateDrink = pirateBartender.createDrink(state)
	var cocktailRandomName = cocktailNameCreator(cocktailNames.nameAdjective(), cocktailNames.nameNoun())
	showResults()
	renderDrink(pirateDrink)
	renderDrinkName(cocktailRandomName)
}

// event listner for starting again/creating a new drink
$(".drinkContainer").on("click","button", function(){
	showQuestions()
	state.currentQuestionIndex = 0;
	state.userPreferences = [];
	renderCurrentQuestion()
})

// loads first question in the DOM
$(document).ready(function(){
	renderCurrentQuestion()
})
