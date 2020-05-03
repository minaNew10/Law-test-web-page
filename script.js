
document.getElementById("btnSaveBranchedCategory").onclick = function(){
	
	var text = document.getElementById("txtBranchedCatName").value
	alert(" تم حفظ التصنيف الفرعي " + text)
}
document.getElementById("btnSaveMainCategory").onclick = function(){
	var text = document.getElementById("txtMainCatName").value
	alert(" تم حفظ التصنيف الرئيسي " + text )
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

