var categories

document.getElementById("btnSaveMainCategory").onclick = function(){
	var text = document.getElementById("txtMainCatName").value
	console.log(text)
	writeMainCategory(text)
}
document.getElementById("btnSaveBranchedCategory").onclick = function(){
	
	var branchedCat = document.getElementById("txtBranchedCatName").value
	var select = document.getElementById("selectCat0")
	var index = select.selectedIndex
	var optionsItems = select.options
	var mainCat = optionsItems[index].text
	
	document.getElementById("object").innerHTML = mainCat; 
	writeBranchedCategory(branchedCat,mainCat)
	
}
document.getElementById("btnSaveQuestion").onclick = function(){
	alert(" تم حفظ السؤال " )
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
	  intializeFirebase()
	  
	  firebase.database().ref("categories").once("value").then(function(snapshot) {
	  categories = makeCategoryList(snapshot)
	
	  createSelectOptions(categories)
	  
      
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
	});
	
function intializeFirebase(){
	 var firebaseConfig = {
		apiKey: "AIzaSyBMreciTLPtbvTuCKiSBt48LVDOouQVwLg",
		authDomain: "law-test-7a1ff.firebaseapp.com",
		databaseURL: "https://law-test-7a1ff.firebaseio.com",
		projectId: "law-test-7a1ff",
		storageBucket: "law-test-7a1ff.appspot.com",
		messagingSenderId: "215803553745",
		appId: "1:215803553745:web:d6f6caf93408b7209d22f0"
	  };
	  
	  firebase.initializeApp(firebaseConfig);
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

function makeCategoryList(snapshot) {
  var catKeys = Object.keys(snapshot.val())
  var catValues = Object.values(snapshot.val())
  var categories = []
  var category = {name:"",key:"",category : {}}
  for(i = 0; i < catValues.length; i++) { 
	category = catValues[i]
	category.key = catKeys[i]
	categories.push(category)
 } 
 return categories 
}
function populatDoc(categories){
	document.getElementById("object").innerHTML = JSON.stringify(categories[0].name, null, 2);
}
//pass array of type category
function createSelectOptions(arr){
	questionBar = document.getElementById("questionClassBar")
	branchedBar = document.getElementById("branchedCategroyPar")
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
}

