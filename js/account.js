( function () {

    var nameError = false;
    var emailReqError = false;
    var emailValError = false;
    var passwordReqError = false;
    var passwordValError = false;
    var password2ReqError = false;
    var password2ValError = false;

    var userName = document.querySelector( '#name' );
    var userEmail = document.querySelector( '#email' );
    var password = document.querySelector( '#password' );
    var password2 = document.querySelector( "#password2" );

    var helperText = {
        charLength: document.querySelector( '.helper-text .length' ),
        lowercase: document.querySelector( '.helper-text .lowercase' ),
        uppercase: document.querySelector( '.helper-text .uppercase' ),
        special: document.querySelector( '.helper-text .special' )
    };

    var pattern = {
        charLength: function () {
            if ( password.value.length >= 8 ) {
                return true;
            }
        },
        lowercase: function () {
            var regex = /^(?=.*[a-z]).+$/;
            if ( regex.test( password.value ) ) {
                return true;
            }
        },
        uppercase: function () {
            var regex = /^(?=.*[A-Z]).+$/;
            if ( regex.test( password.value ) ) {
                return true;
            }
        },
        special: function () {
            var regex = /^(?=.*[0-9_\W]).+$/;
            if ( regex.test( password.value ) ) {
                return true;
            }
        }
    };


    function checkName() {

        if ( userName.value.length < 1 ) {
            $( "#nameError" ).html( "Name is Required" );
            nameError = true;
        } else {
            $( "#nameError" ).html( "" );
            nameError = false;
            localStorage.setItem( 'name', userName.value );

        }

    }

    function checkEmail() {

        var areReal = false;
        var emailRegex = new RegExp( "^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$" );
        var result = emailRegex.test( userEmail.value );

        if ( userEmail.value.length < 1 ) {
            $( "#emailError" ).html( "Email is Required" );
            emailReqError = true;
            emailValError = true;
        } else if ( !result ) {
            $( "#emailError" ).html( "Invalid Email" );
            emailReqError = false;
            emailValError = true;
        } else {
            $( "#emailError" ).html( "" );
            emailReqError = false;
            emailValError = false;

        }

    }

    function checkPass() {
        patternTest( pattern.charLength(), helperText.charLength );
        patternTest( pattern.lowercase(), helperText.lowercase );
        patternTest( pattern.uppercase(), helperText.uppercase );
        patternTest( pattern.special(), helperText.special );

        if ( hasClass( helperText.charLength, 'valid' ) &&
            hasClass( helperText.lowercase, 'valid' ) &&
            hasClass( helperText.uppercase, 'valid' ) &&
            hasClass( helperText.special, 'valid' )
        ) {
            addClass( password.parentElement, 'valid' );
            passwordValError = false;
        } else {
            removeClass( password.parentElement, 'valid' );
            passwordValError = true;
        }

        if ( password.value.length < 1 ) {
            $( "#passwordError" ).html( "Password is Required" );
            passwordReqError = true;
        } else {
            $( "#passwordError" ).html( "" );
            passwordReqError = false;
        }
    }

    function checkPass2() {

        var helperText = document.getElementById( 'passwordMatch' );
        if ( password.value === password2.value ) {
            addClass( helperText, 'valid' );
            password2ValError = false;
        } else {
            removeClass( helperText, 'valid' );
            password2ValError = true;
        }

        if ( password2.value.length < 1 ) {
            helperText = document.getElementById( 'passwordMatch' );
            removeClass( helperText, 'valid' );
            password2ReqError = true;

        } else {
            password2ReqError = false;
        }

    }

    function patternTest( pattern, response ) {
        if ( pattern ) {
            addClass( response, 'valid' );
        } else {
            removeClass( response, 'valid' );
        }
    }

    function addClass( el, className ) {
        if ( el.classList ) {
            el.classList.add( className );
        } else {
            el.className += ' ' + className;
        }
    }

    function removeClass( el, className ) {
        if ( el.classList )
            el.classList.remove( className );
        else
            el.className = el.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' );
    }

    function hasClass( el, className ) {
        if ( el.classList ) {
            return el.classList.contains( className );
        } else {
            new RegExp( '(^| )' + className + '( |$)', 'gi' ).test( el.className );
        }
    }

    function validate() {
        var self = this;
        var errors = true;
        var errorMessage = "Please correct the following errors";

        checkName();
        checkEmail();
        checkPass();
        checkPass2();

        errors = nameError + emailReqError + emailValError + passwordReqError + passwordValError + password2ReqError + password2ValError;


        return {
            containsErrors: errors,
            errorMessage: errorMessage
        };
    }

    var createAccount = document.querySelector( '#create-account' );
    createAccount.onclick = function () {
        var validState = validate();

        if ( validState.containsErrors ) {
            var errorMessage = document.querySelector( '#error-message' );
            errorMessage.innerHTML = validState.errorMessage;
        } else {
            $( 'form' ).submit();
        }
    };

    password.onkeyup = function ( evt ) {
        checkPass();
    };

    password2.onfocusout = function ( evt ) {
        checkPass2();
    };

    password.onfocusout = function ( evt ) {
        checkPass();
    };

    userEmail.onfocusout = function ( evt ) {
        checkEmail();
    };

    userName.onfocusout = function ( evt ) {
        checkName();
    };

    //removing the bubbles
    var forms = document.getElementsByTagName( 'form' );
    for ( var i = 0; i < forms.length; i++ ) {
        forms[ i ].addEventListener( 'invalid', function ( e ) {
            e.preventDefault();
            //Possibly implement your own here.
        }, true );
    }

} )();
