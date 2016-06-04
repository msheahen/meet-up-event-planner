var APP = ( function () {
    /**
     * Creates an Array of DOM nodes that match the selector
     * @param selector {string} CSS selector - selector to match against
     * @return {array} Array of DOM nodes
     */

    //load user name into host name

    $( "#eventHost" ).val( localStorage.getItem( 'name' ) );

    function getDomNodeArray( selector ) {
        var nodes = Array.prototype.slice.apply( document.querySelectorAll( selector ) );
        if ( !nodes ) {
            nodes = [];
        }
        return nodes;
    }

    var enameError = false;
    var etypeError = false;
    var estartError = false;
    var eendError = false;
    var erangeError = false;
    var ehostError = false;
    var edescriptionError = false;
    var eAddressError = false;
    var ecityError = false;
    var estateError = false;
    var eattendeeError = false;

    var eventName = document.querySelector( '#eventName' );
    var eventType = document.querySelector( '#eventType' );
    var eventStart = document.querySelector( '#startDate' );
    var eventEnd = document.querySelector( '#endDate' );
    var eventHost = document.querySelector( '#eventHost' );
    var eventDescription = document.querySelector( '#eventDescription' );
    var eventAddress = document.querySelector( '#eventAddress' );
    var eventCity = document.querySelector( '#eventCity' );
    var eventState = document.querySelector( '#eventState' );
    var newGuest = document.querySelector( 'input.new-guest' );
    var people = document.querySelector( '#attendees' );

    eventName.onfocusout = function ( evt ) {
        checkName();
    };

    eventType.onfocusout = function ( evt ) {
        checkType();
    };

    eventStart.onfocusout = function ( evt ) {
        checkStart();
    };


    eventEnd.onfocusout = function ( evt ) {
        checkEnd();
    };


    eventHost.onfocusout = function ( evt ) {
        checkHost();
    };


    eventDescription.onfocusout = function ( evt ) {
        checkDescription();
    };



    eventAddress.onfocusout = function ( evt ) {
        checkAddress();
    };


    eventCity.onfocusout = function ( evt ) {
        checkCity();
    };


    eventState.onfocusout = function ( evt ) {
        checkState();
    };


    function checkName() {

        if ( eventName.value.length < 1 ) {
            $( "#eventNameError" ).html( "Event Name is Required" );
            enameError = true;
        } else {
            $( "#eventNameError" ).html( "" );
            enameError = false;
            localStorage.setItem( 'eventName', eventName.value );
        }
    }

    function checkType() {
        if ( eventType.value.length < 1 ) {
            $( "#eventTypeError" ).html( "Event Type is Required" );
            etypeError = true;
        } else {
            $( "#eventTypeError" ).html( "" );
            etypeError = false;
            localStorage.setItem( 'eventType', eventType.value );
        }
    }

    function checkStart() {
        if ( eventStart.value.length < 1 ) {
            $( "#startDateError" ).html( "Start Date is Required" );
            estartError = true;
        } else {
            $( "#startDateError" ).html( "" );
            estartError = false;
            localStorage.setItem( 'eventStart', eventStart.value );
        }
    }

    function checkEnd() {

        if ( eventEnd.value.length < 1 ) {
            $( "#endDateError" ).html( "End Date is Required" );
            eendError = true;
        } else if ( eventEnd.value <= eventStart.value ) {
            $( "#endDateError" ).html( "Event ending time must be after event starting time" );
            erangeError = true;
            eendError = false;
        } else {
            $( "#endDateError" ).html( "" );
            eendError = false;
            erangeError = false;
            localStorage.setItem( 'eventEnd', eventEnd.value );
        }
    }

    function checkHost() {
        if ( eventHost.value.length < 1 ) {
            $( "#eventHostError" ).html( "Event Host is Required" );
            ehostError = true;
        } else {
            $( "#eventHostError" ).html( "" );
            ehostError = false;
            localStorage.setItem( 'eventHost', eventHost.value );
        }
    }

    function checkDescription() {

        if ( eventDescription.value.length < 1 ) {
            $( "#eventDescriptionError" ).html( "Event Description is Required" );
            edescriptionError = true;
        } else {
            $( "#eventDescriptionError" ).html( "" );
            edescriptionError = false;
            localStorage.setItem( 'eventDescription', eventDescription.value );
        }

    }

    function checkAddress() {
        if ( eventAddress.value.length < 1 ) {
            $( "#eventAddressError" ).html( "Event Address is Required" );
            eaddressError = true;
        } else {
            $( "#eventAddressError" ).html( "" );
            eaddressError = false;
            localStorage.setItem( 'eventAddress', eventAddress.value );
        }
    }

    function checkCity() {
        if ( eventCity.value.length < 1 ) {
            $( "#eventCityError" ).html( "Event City is Required" );
            ecityError = true;
        } else {
            $( "#eventCityError" ).html( "" );
            ecityError = false;
            localStorage.setItem( 'eventCity', eventCity.value );
        }
    }

    function checkState() {
        if ( eventState.value.length < 1 ) {
            $( "#eventStateError" ).html( "Event State is Required" );
            estateError = true;
        } else {
            $( "#eventStateError" ).html( "" );
            estateError = false;
            localStorage.setItem( 'eventState', eventState.value );
        }
    }

    function checkGuests() {
        var areReal = false;

        var emailRegex = new RegExp( "^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$" );
        people.forEach( function ( guest, index ) {
            var result = emailRegex.exec( guest.value );
            if ( result && result.index === 0 ) {
                if ( index === 0 ) {
                    areReal = true;
                } else {
                    areReal = areReal && true;
                }
            } else {
                areReal = areReal && false;
            }
        } );
        return areReal;

    }

    function checkAttendees() {
        if ( document.getElementById( 'attendees' ).innerHTML === '' ) {
            return false;
        } else {
            localStorage.setItem( 'attendees', document.getElementById( 'attendees' ).innerText );
            return true;

        }

    }

    /*
    Adding guests
     */

    newGuest.onkeydown = function ( evt ) {
        if ( evt.keyIdentifier === "Enter" ) {

            //check guest email before you can add it!
            var emailRegex = new RegExp( "^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$" );
            var result = emailRegex.test( newGuest.value );

            if ( !result ) {
                console.log( 'event!' );
                $( "#eventGuestError" ).html( "email address not valid" );
            } else {
                var enteredPerson = document.createElement( 'div' );
                var deletePerson = document.createElement( 'button' );
                deletePerson.innerHTML = "-";
                deletePerson.parent = enteredPerson;

                deletePerson.onclick = function () {
                    people.removeChild( this.parent );
                };
                enteredPerson.innerHTML = newGuest.value;
                enteredPerson.value = newGuest.value; // for easy access later
                enteredPerson.appendChild( deletePerson );

                people.appendChild( enteredPerson );
                newGuest.value = "";
                $( "#eventGuestError" ).html( "" );
            }
        }
    };



    function validate() {
        var self = this;
        var allGood = false;
        var errorMessage = "Please correct the following errors: <br>";

        checkName();
        checkType();
        checkStart();
        checkEnd();
        checkHost();
        checkDescription();
        checkAddress();
        checkCity();
        checkState();

        var validAttendees = checkAttendees();
        if ( !validAttendees ) {
            eattendeeError = true;
            $( "#eventGuestError" ).html( "You must add at least one guest" );
        } else {
            eattendeeError = false;
            $( "#eventGuestError" ).html( "" );
        }

        localStorage.setItem( 'eventMessage', $( "#eventMessage" ).value );
        var errors = enameError + etypeError + estartError + eendError + erangeError + ehostError + edescriptionError + eaddressError + ecityError + estateError + eattendeeError;

        return {
            containsErrors: errors,
            errorMessage: errorMessage
        };
    }

    var createButton = document.querySelector( 'button#create-event' );
    createButton.onclick = function () {
        var validState = validate();

        if ( validState.containsErrors ) {
            var errorMessage = document.querySelector( '#error-message' );
            errorMessage.innerHTML = validState.errorMessage;
        } else {
            location = 'past-event.html';
        }
    };


    //disabling autmatic submission on enter
    $( "form" ).bind( "keypress", function ( e ) {
        if ( e.keyCode == 13 ) {
            $( "#btnSearch" ).attr( 'value' );
            //add more buttons here
            return false;
        }
    } );


    //removing the bubbles
    var forms = document.getElementsByTagName( 'form' );
    for ( var i = 0; i < forms.length; i++ ) {
        forms[ i ].addEventListener( 'invalid', function ( e ) {
            e.preventDefault();
            //Possibly implement your own here.
        }, true );
    }





} )();
