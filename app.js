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

//<-- Bartender object -->
var pirateBartender= Object.create(Bartender.prototype)

//<-- State object which saves the user's preferences -->

var state= {
	yesBtn: false,
	ingredientsPreference:[],
}

//<-- State modification functions -->

//<-- function that saves the ingredients preferred by the user in the state object -->
var chosenIngredients = function(state,currentQuestion){
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

// <-- jQuery functions to modify the DOM -->

// <-- event listner for yes button. Calls functions and methods to create a drink and renders content into the DOM  -->
$(".yesBtn").on("click", function(event){
	event.preventDefault()
	state["yesBtn"]= true
	console.log("yes button selected", state)
	var index= questionIndex()
	console.log("index", index)
	presentQuestion(index)
	renderQuestion(state, $(".question"))
	chosenIngredients(state,presentQuestion(index-1))
	window.pirateDrink = pirateBartender.createDrink(state.ingredientsPreference)
	console.log("drink", pirateDrink)
	if(index===window.arrayQuestions.length){
		$(".questionContainer").hide()
        $(".drinkContainer").show()
        renderDrink($(".drinkIngredients"))
	}
})

// <-- event listner for no button. Renders the next question -->
$(".noBtn").on("click", function(event){
	event.preventDefault()
	console.log("this is running")
	var index= questionIndex()
	presentQuestion(index)
	renderQuestion(state, $(".question"))
})

// <-- event listner for starting again/creating a new drink -->
$(".drinkContainer").on("click","button", function(){
	$(".questionContainer").show()
    $(".drinkContainer").hide()
    window.counter=-1
    state.ingredientsPreference=[]
    var index= questionIndex()
    console.log("index re-start", index)
	presentQuestion(index)
	renderQuestion(state, $(".question"))
})

// <-- loads first question in the DOM -->
$(document).ready(function(){
	var index= questionIndex()
	presentQuestion(index)
	renderQuestion(state, $(".question"))
})










