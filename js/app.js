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

//<-- method shared by all bartenders that takes the ingredients from the user's preferences randomly and creates a drink -->
Bartender.prototype.createDrink= function(ingredientsPreference){
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

//<-- Bartender object -->
var pirateBartender= Object.create(Bartender.prototype)

// <-- cocktail names object -->
var cocktailNames={
	adjectives:["Fluffy", "Salty", "Illegal", "Infamous", "Ferocious", "Vicious", "Ruthless"],
	nouns:["Vessel", "Mate", "Cannon", "Ship", "Maggot", "Ruffian", "Parrot"],
	nameAdjective: function(){
			return cocktailNames.adjectives[Math.floor(Math.random()*cocktailNames.adjectives.length)]
		},
	nameNoun: function(){
			return cocktailNames.nouns[Math.floor(Math.random()*cocktailNames.nouns.length)]
		},
		
}

//<-- State object which saves the user's preferences -->

var state= {
	yesBtn: false,
	ingredientsPreference:[],
	noPreference: false,
}

//<-- State modification functions -->

//<-- function that saves the ingredients preferred by the user in the state object -->
var chosenIngredients= function(state,currentQuestion){
	var currentQuestion= window.currentQuestion
	var questionsArray= window.arrayQuestions
	if((currentQuestion===questionsArray[0]) && (state.yesBtn)){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[0])
	}else if((currentQuestion===questionsArray[1])&& (state.yesBtn)){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[1])
	}else if((currentQuestion===questionsArray[2])&& (state.yesBtn)){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[2])
	}
	else if((currentQuestion===questionsArray[3])&& (state.yesBtn)){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[3])
	}
	else if((currentQuestion===questionsArray[4])&& (state.yesBtn)){
		state.ingredientsPreference.push(pantryIngredients.availableIngredients[4])
	}
}

// <-- Function that identifies if user didn't enter anything and makes state.noPreference true -->
var noDrink= function(state,ingredientsPreference){
	if(state.ingredientsPreference.length===0){
		state["noPreference"]=true
	}
}

// <-- Function that creates a name for cocktails -->
var cocktailNameCreator= function(adjective, noun){
	var cocktailAdjective= adjective
	var cocktailNoun= noun
	var cocktailName= cocktailAdjective+ " " +cocktailNoun
	return cocktailName
}

// <-- Function to create an array of questions and determine the current question -->
var presentQuestion = function(questionIndex){
    window.arrayQuestions = []
    window.arrayQuestions.push(question1.question, question2.question, question3.question, question4.question, question5.question)
    window.currentQuestion = arrayQuestions[questionIndex]
}

// <-- Counter function to keep track of question number -->
var questionIndex = (function () {
    window.counter = -1;
    return function () {return counter += 1;}
})();

// <-- Render content in the DOM -->

// <-- function to render the current question in the DOM -->
var renderQuestion= function(state,element){
	var questionHTML= "<h2>"+window.currentQuestion+"</h2>"
	element.html(questionHTML)
}

// <-- function to render the drink created by the bartender in the DOM -->
var renderDrink= function(element){
	var drinkHTML= window.pirateDrink.map(function(item){
        return "<li>"+item+"</li>"
    })
	element.html(drinkHTML)
}

// <-- Function to render the drink's name -->
var renderDrinkName= function(element){
	var drinkNameHTML= "<h2>The"+" "+window.cocktailRandomName+"</h2>"
	element.html(drinkNameHTML)
}

// <-- Function to render error -->
var renderError= function(element){
	var errorHTML= "<h2>So ye got no scurvy pirate taste! Goodby!</h2>"
	element.html(errorHTML)
}

// <-- jQuery functions to modify the DOM -->

// <-- event listner for yes button. Calls functions and methods to create a drink and renders content into the DOM  -->
$(".yesBtn").on("click", function(event){
	event.preventDefault()
	state["yesBtn"]= true
	var index= questionIndex()
	presentQuestion(index)
	renderQuestion(state, $(".question"))
	chosenIngredients(state,presentQuestion(index-1))
	window.pirateDrink= pirateBartender.createDrink(state.ingredientsPreference)
	window.cocktailRandomName= cocktailNameCreator(cocktailNames.nameAdjective(), cocktailNames.nameNoun()) 
	console.log("drink", window.cocktailRandomName)
	if(index===window.arrayQuestions.length){
		$(".questionContainer").hide()
        $(".drinkContainer").show()
        renderDrink($(".drinkIngredients"))
        renderDrinkName($(".drinkName"))
	}
})

// <-- event listner for no button. Renders the next question -->
$(".noBtn").on("click", function(event){
	event.preventDefault()
	var index= questionIndex()
	presentQuestion(index)
	renderQuestion(state, $(".question"))
	noDrink(state,state.ingredientsPreference)
	if((state.noPreference) && (index===window.arrayQuestions.length)){
		$(".questionContainer").hide()
        $(".drinkContainer").show()
		renderError($(".drinkContainer"))
	}
})

// <-- event listner for starting again/creating a new drink -->
$(".drinkContainer").on("click","button", function(){
	$(".questionContainer").show()
    $(".drinkContainer").hide()
    window.counter=-1
    state.ingredientsPreference=[]
    var index= questionIndex()
	presentQuestion(index)
	renderQuestion(state, $(".question"))
})

// <-- loads first question in the DOM -->
$(document).ready(function(){
	var index= questionIndex()
	presentQuestion(index)
	renderQuestion(state, $(".question"))
})










