//<-- Object constructors -->

var Question= function(question){
	this.question = question
}

var Ingredients= function(ingredients){
	this.ingredients= []
}

var Pantry= function(availableIngredients){
	this.availableIngredients = []
}

//<-- Objects -->

// <-- Question Objects -->
var question1= new Question("Do ye like yer drinks strong?")
var question2= new Question("Do ye like it with a salty tang?")
var question3= new Question("Are ye a lubber who likes it bitter?")
var question4= new Question("Would ye like a bit of sweetness with yer poison?")
var question5= new Question("Are ye one for a fruity finish?")

// <-- Ingredients objects -->
var strongIngredients= new ingredients(["glug of rum", "slug of whisky", "splash of gin"])
var saltyIngredients= new ingredients(["olive on a stick", "salt-dusted rim", "rasher of bacon"])
var bitterIngredients= new ingredients(["shake of bitters", "splash of tonic", "twist of lemon peel"])
var sweetIngredients= new ingredients(["sugar cube", "spoonful of honey", "splash of cola"])
var fruityIngredients= new ingredients(["slice of orange", "dash of cassis", "cherry on top"])

// <-- Pantry objects -->
var pantryIngredients= new availableIngredients(["glug of rum", "slug of whisky", "splash of gin","olive on a stick", "salt-dusted rim", "rasher of bacon","shake of bitters", "splash of tonic", "twist of lemon peel","sugar cube", "spoonful of honey", "splash of cola","slice of orange", "dash of cassis", "cherry on top"])


