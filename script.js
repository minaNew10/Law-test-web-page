

getMainCategories()
document.getElementById("btnSaveMainCategory").onclick = function(){
	var text = document.getElementById("txtMainCatName").value
	
	writeMainCategory(text)
}
document.getElementById("btnSaveBranchedCategory").onclick = function(){
	
	var branchedCat = document.getElementById("txtBranchedCatName").value
	var select = document.getElementById("selectCat0")    
	mainCat = getSelectValue(select)	
	writeBranchedCategory(branchedCat,mainCat)
	
}
document.getElementById("btnSaveQuestion").onclick = function(){
	/*var select = document.getElementById("selectCat1")
	var index = select.selectedIndex
	var optionsItems = select.options
	var mainCat = optionsItems[index].text
	question = createQuestion()
	
	writeQuestion(question)
	alert(" تم حفظ السؤال " )*/
	var selectMain = document.getElementById("selectCat1")
	var selectbranched = document.getElementById("branchedCat")
	
	var mainClassification = getSelectValue(selectMain)
	
	
	var branchedClassification = getSelectValue(selectBranched)
	
	alert(mainClassification + " " + branchedClassification)
	
}

function createQuestion(){
	var questionBody = document.getElementById("question")
	var choice1 = document.getElementById("txtFirstChoice").value
	var choice2 = document.getElementById("txtSecChoice").value
	var choice3 = document.getElementById("txtThirdChoice").value
	var choice4 = document.getElementById("txtForChoice").value
	var choices = {
		1 : choice1,
		2 : choice2,
		3 : choice3,
		4 : choice4,
	}

	var correctAnswer = document.getElementById("txtCorrectAns").value
	var ansRef = document.getElementById("ansReference").value
	var difficulty = getRadioValue()
	var selectMain = document.getElementById("selectCat1")
	var selectbranched = document.getElementById("branchedCat")
	var mainClassification = getSelectValue(selectMain)
	
	var branchedClassification = getSelectValue(selectBranched)
	
	var classification  = getSelectValue(selectBranched)+ " " + getSelectValue(selectMain)
	classification = classification.replace(/\s/g, "_");
	var question = {
		questionBody : questionBody,
		choices : choices,
		correctAnswer : correctAnswer,
		ansRef : ansRef,
		difficulty : difficulty,
		classification : classification
	}
	return question
}
function writeQuestion(question){
	firebase.database().ref("questions/" + question.classification).set({
		ques : question
	})
}
 
function getMainCategories(){
  firebase.database().ref("categories").once("value").then(function(snapshot) {
	  categories = makeCategoryList(snapshot)
	  createMainCatSelectOptions(categories)
  }); 
 
}
function makeCategoryList(snapshot) {
  var catKeys = Object.keys(snapshot.val())
  var catValues = Object.values(snapshot.val())
  var categories = []
  var category = {name:"",key:""}
  for(i = 0; i < catValues.length; i++) { 
	category = catValues[i]
	categories.push(category)
 } 
 return categories 
}
function getBranchedCategories(mainCat){
	firebase.database().ref("categories/" + mainCat).once("value").then(function(snapshot) {
	branchedCategories = makeCategoryList(snapshot)
	createBrancedCatSelectOptions(branchedCategories)
  
  }); 
}
function writeMainCategory(category){
	alert(" تم حفظ التصنيف الرئيسي " + category )
	firebase.database().ref("categories/" + category).set({
		name : category
	})
}

function writeBranchedCategory(branchedCat,mainCat){	
	firebase.database().ref("categories/" + mainCat + "/"  + branchedCat).set({
		name : branchedCat
	})
}


function getRadioValue() { 
	var ele = document.getElementsByName("difficulty"); 
	var text 
	for(i = 0; i < ele.length; i++) { 
		if(ele[i].checked) 
			text = ele[i].value; 
	}
	
	return text;
}
function getSelectValue(selectElement){
	var index = selectElement.selectedIndex
	var optionsItems = selectElement.options
	var selected = optionsItems[index].text	
	return selected
}
function printArr(arr){
	for(var i = 0; i < arr.length; i++){
		
	}
}
//pass array of type category
function createMainCatSelectOptions(arr){
	
	var newSelect= document.createElement("select");
	for(i = 0; i < arr.length; i++){
	   var opt = document.createElement("option");
	   
	   opt.value = arr[i].name;
	   opt.innerHTML = arr[i].name; // whatever property it has
	  
	   // then append it to the select element
	   newSelect.appendChild(opt);
	}
	var elements = document.getElementsByClassName("mainCatSelect");
	for (var i = 0; i < elements.length; i++) {
        copy = newSelect.cloneNode(true)
		copy.setAttribute("id" , "selectCat" + i)
		
		elements[i].appendChild(copy)
	}
	//get the selection of the mainCat to view it's corresponding branched ones
	var select = document.getElementById("selectCat1")
	var index = select.selectedIndex
	var optionsItems = select.options
	var mainCat = optionsItems[index].text
	getBranchedCategories(mainCat)
	
	 document.getElementById("selectCat1").onchange = function(){
	    var index = select.selectedIndex
		var mainCat = optionsItems[index].text
		getBranchedCategories(mainCat)
		}
		
}

function createBrancedCatSelectOptions(branchedCategories){
	
	
	branchedBar = document.getElementById("branchedCatSelect")
	selectBranched = document.getElementById("branchedCat") 
	
	if(document.getElementById("branchedCat") != null){
		
		branchedBar.removeChild(selectBranched)
	}
	//check if it is already present in order not to create it again
	
		var newSelect= document.createElement("select");
		
		if(branchedCategories.length != 0){
			for(i = 0; i < branchedCategories.length; i++){
				if(branchedCategories[i].name != null){
				   var opt = document.createElement("option");	   
				   opt.value = branchedCategories[i].name;
				   
				   opt.innerHTML = branchedCategories[i].name; // whatever property it has
				   // then append it to the select element
				  
				   newSelect.appendChild(opt);
				}
			}
		}
		newSelect.setAttribute("id","branchedCat")
		branchedBar.appendChild(newSelect)
	selectBranched = document.getElementById("branchedCat") 
	
	
}


	/*
		var arrKeys = Object.keys(snapshot.val())
		var category = {name:"",key:"",branches : {}}
		var arrValues = Object.values(snapshot.val())
		category = arrValues[0]
		category.key = arrKeys[0]
		//document.getElementById("object").innerHTML = JSON.stringify(category.name + category.key, null, 2); 
		 snapshot.forEach(function(childSnapshot){
			   var childKey = childSnapshot.key;
			   var data = childSnapshot.val();
		   //  document.getElementById("object").innerHTML = JSON.stringify(snapshot.val(), null, 2); 
		    // document.getElementById("object").innerHTML = JSON.stringify(childSnapshot.val(), null, 2); 
		     document.getElementById("object").innerHTML = JSON.stringify(childKey, null, 2); 
		  });
		  */