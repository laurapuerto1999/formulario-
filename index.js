const formulario = document.getElementById('formulario');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const pàssword = document.getElementById('passwordConfirm');

const iconoError = document.getElementsByClassName('icono-error');
const iconoSuccess = document.getElementsByClassName('icono-success');


window.onload = function() {
    for(i=0; i<iconoError.length; i++){
        iconoError[i].style.display = 'none';
        iconoSuccess[i].style.display = 'none';
    }
};

function validarFormulario() {
    if(validarDatos()){
        alert("El registro se ha realizado correctamente");
    }
}

function error(e, mensaje) {
    const controlEntrada = e.parentElement.parentElement;
    const mostrarError = controlEntrada.querySelector('.error');
    const iconoError = controlEntrada.querySelector('.icono-error');
    const iconoSuccess = controlEntrada.querySelector('.icono-success');
    mostrarError.innerText = mensaje;
    controlEntrada.classList.add('error');
    controlEntrada.classList.remove('success');
    iconoError.style.display = 'block';
    iconoSuccess.style.display = 'none';
}


function success(e){
    const controlEntrada = e.parentElement.parentElement;
    const mostrarError = controlEntrada.querySelector('.error');
    const iconoError = controlEntrada.querySelector('.icono-error');
    const iconoSuccess = controlEntrada.querySelector('.icono-success');

    mostrarError.innerText = '';
    controlEntrada.classList.add('success');
    controlEntrada.classList.remove('error');
    iconoError.style.display = 'none';
    iconoSuccess.style.display = 'block';
}

/**
 *  Funcion que recibe un emial y valida 
 *  si cumple la expresion regular
 * @param {*} email 
 * @returns si el email es valido
 */
function emailValido(email){
    const expresionRegularEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return expresionRegularEmail.test(String(email).toLowerCase());
}

/**
 * Funcion que recibe un nombre de usuario y valida si solo contiene letras
 * @param {*} username 
 * @returns si el nombre usuario es valido 
 */
function usernameValido(username){
    const expresionRegularUsername = /^[a-zA-Z]+$/;
    return expresionRegularUsername.test(String(username).toLowerCase());
}

function validarDatos() {

    let checkUsername = false;
    let checkMail = false;
    let checkPassword = false;
    let checkPasswordConfirm = false;
    const valor_username = username.value;
    const valor_email = email.value;
    const valor_password = password.value;
    const valor_passwordConfirm = passwordConfirm.value;

    if(valor_username === '') {
        error(username, 'Rellene este campo');
        checkUsername = false;
    }else if (!usernameValido(valor_username)){  
        error(username, 'Nombre de usuario no puedo contener numeros');
        checkUsername = false;
    }else{
        success(username)
        checkUsername = true;
    }

    if(valor_email === ''){
        error(email, 'Rellene este campo');
        checkMail = false;
    }else if (!emailValido(valor_email)){
        error(email, 'Email no valido');
        checkMail = false;
    }else{
        success(email)
        checkMail=true;
    }

    if(valor_password === ''){
        error(password, 'Rellene este campo');
        checkPassword = false;
    } else if (valor_password.length > 8){
        error(password, 'No debe tener mas de 8 caracteres');
        checkPassword = false;
    } else {
        success(password);
        checkPassword=true;
    }

    if(valor_passwordConfirm === ''){
        error(passwordConfirm, 'Rellene este campo');
        checkPasswordConfirm=false;
    } else if(valor_password !== valor_passwordConfirm){
        error(passwordConfirm, 'Contraseñas no coinciden');
        checkPasswordConfirm=false;
    } else {
        success(passwordConfirm);
        checkPasswordConfirm=true;
    }

    return checkUsername && checkMail && checkPassword && checkPasswordConfirm;
}