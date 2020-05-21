intializeFirebase()
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