
document.getElementById("btnSaveBranchedCategory").onclick = function(){
	
	var text = document.getElementById("txtBranchedCatName").value
	
}
document.getElementById("btnSaveMainCategory").onclick = function(){
	var text = document.getElementById("txtMainCatName").value
	
	writeMainCategory(text)
}
document.getElementById("btnSaveQuestion").onclick = function(){
	alert(" تم حفظ السؤال " + displayRadioValue())
}

function displayRadioValue() { 
	var ele = document.getElementsByName("difficulty"); 
	var text 
	for(i = 0; i < ele.length; i++) { 
		if(ele[i].checked) 
			text = ele[i].value; 
	}
	return text;
} 
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
	  firebase.database().ref("categories").once("value").then(function(snapshot) {
		document.getElementById("object").innerHTML = JSON.stringify(snapshot.val(), null, 2); 
	});
	
	
function writeMainCategory(category){
	alert(" تم حفظ التصنيف الرئيسي " + category )
	firebase.database().ref("categories").push({
		name : category
	})
}

