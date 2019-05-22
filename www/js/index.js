function loginUser() { //logs user in
    var email    = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        window.location = 'main.html'; // redirects to the main page
    }).catch(error => {
        console.error(error);
    })
}

function logoutUser() { // logs the user out
    firebase.auth().signOut().then(user => {
        window.location = 'index.html'; //redirects back to main page on logout
    });
    alert("You have signed out.")
}

function createNew() {
    window.location = 'newUser.html'; // directs to create new user
}

function newUser() { //create new user function
    var newEmail    = document.getElementById('newEmail').value;
    var newPassword = document.getElementById('newPassword').value;
    if (newEmail.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (newPassword.length < 4) {
        alert('Please enter a password.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword).then(user => { //creates new user
        alert('Account Created');
        window.location = 'index.html'; //redirects after new user has been created
    }).catch(function (error) {
        var errorCode    = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}

function onDeviceReady() {
    document.getElementById("cameraTakePicture").addEventListener
    ("click", cameraTakePicture);
    document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture);
    document.getElementById("getPosition").addEventListener("click", getPosition);
}

function cameraTakePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true,
    });

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function cameraGetPicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
    });

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function getPosition() {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    };
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {
        document.getElementById('location').value = 'Latitude: ' + position.coords.latitude + ', ' +
            'Longitude: ' + position.coords.longitude;
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}

function writeUserData() {

    /* Grab the data from the form */
    let photo    = document.querySelector("#myImage").src;
    let place    = document.querySelector('#place').value;
    let position = document.querySelector('#location').value;
    let summary  = document.querySelector('#summary').value;

    /* Create an object with the values to store in the DB */
    let newData = {
        photo: photo,
        place: place,
        gps_position: position,
        summary: summary
    };

    /* Insert the data */
    firebase.database().ref('group7/teamData').push(newData).then((result) => {
        console.log(result);
    })
}

