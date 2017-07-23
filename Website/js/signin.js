(function() {
 	// Initializae Firebase
 	const config = {
        apiKey: "AIzaSyBcWs5UYSvsm3qFxkofIcHY4p7bDmIJD4g",
        authDomain: "formula-e-60d84.firebaseapp.com",
        databaseURL: "https://formula-e-60d84.firebaseio.com",
        projectId: "formula-e-60d84",
        storageBucket: "formula-e-60d84.appspot.com",
        messagingSenderId: "218918819433"
    };

	   firebase.initializeApp(config);

  	// Login Elements
  	const txtEmail = document.getElementById('txtEmail');
  	const txtPassword = document.getElementById('txtPassword');
  	const btnLogin = document.getElementById('btnLogin');

  	// Sign Up Elements
  	const txtSignUpEmail = document.getElementById('txtSignUpEmail');
  	const txtSignUpPassword = document.getElementById('txtSignUpPassword')	
  	const btnSignUp = document.getElementById('btnSignUp');

  	// Add login event
  	btnLogin.addEventListener('click', e => {
  		// Get email and pass
  		const email = txtEmail.value;
  		const pass = txtPassword.value;
  		const auth = firebase.auth();
  		// Sign in
  		const promise = auth.signInWithEmailAndPassword(email, pass);
  		promise.catch(e => console.log(e.message));
  	});

    btnSignUp.addEventListener('click', e =>{
	  	// Get email and pass
	  	// TODO: CHECK 4 REAL EMAILZ
	  	const email = txtSignUpEmail.value;
	  	const pass = txtSignUpPassword.value;
	  	const auth = firebase.auth();

	  	// Sign up
	  	const promise = auth.createUserWithEmailAndPassword(email, pass).catch(function(error) {
        if (error.message == null && error.code == null) {
          $('#signUpModal').modal('hide');
        }
      });    
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(function(user) {
        if(user) {
          console.log('Logged in');
          window.location.href = 'index.html';
        } else {
          console.log('Logged out');
        }
    });

 }());