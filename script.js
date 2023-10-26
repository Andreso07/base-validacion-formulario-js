
const firebaseConfig = {
    apiKey: "AIzaSyAX9Mr2rwl0fWEb2pY--YZ6CVFSa-yaWKA",
    authDomain: "datos-de-formulario-bf80e.firebaseapp.com",
    projectId: "datos-de-formulario-bf80e",
    storageBucket: "datos-de-formulario-bf80e.appspot.com",
    messagingSenderId: "404228085300",
    appId: "1:404228085300:web:727b18f4b6a8669ed69c61",
    measurementId: "G-T1VH3G1Y27"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();


    //validar campo nombre
    let nombreEntrada = document.getElementById('name');
    let errorName = document.getElementById('nameError');

    if (nombreEntrada.value.trim() === '') {
        errorName.textContent = 'Por favor introduce un nombre'
        errorName.classList.add('error-message');
    }else{
        errorName.textContent = ''
        errorName.classList.remove('error-message');
    }

    //validar email
    let emailEntrada = document.getElementById('email');
    let errorEmail = document.getElementById('emailError');
    let emailPathern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPathern.test(emailEntrada.value)) {
        errorEmail.textContent = 'Por favor introduce un email valido'
        errorEmail.classList.add('error-message');
    }else{
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message');
    }

    //validar contrasena
    let contrasenaEntrada = document.getElementById('password');
    let errorConstrasena = document.getElementById('passwordError');

    if (contrasenaEntrada.value.length < 8) {
        errorConstrasena.textContent = 'La contrasena debe tener al menos 8 cartacteres'
        errorConstrasena.classList.add('error-message');
    }else{
        errorConstrasena.textContent = ''
        errorConstrasena.classList.remove('error-message');
    }

    // si todos los campos son validos enviar formulario

    if (!errorName.textContent && !errorEmail.textContent && !errorConstrasena.textContent) {

        db.collection("users").add({
            nombre: nombreEntrada.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ",docRef.id);
        })
        .catch((error) => {
        console.error("Error adding document: ", error);
        });

        alert('El formulario se registro con exito')
        document.getElementById('formulario').reset();
    }
});