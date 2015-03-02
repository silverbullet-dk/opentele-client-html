(function () {
    'use strict';

    var translations = angular.module('opentele.translations', [
        'pascalprecht.translate',
        'angularMoment'
    ]);

    translations.config(function($translateProvider, enUsTranslations, daDkTranslations) {

        $translateProvider.translations('en-US', enUsTranslations);
        $translateProvider.translations('da-DK', daDkTranslations);
    });

    translations.run(function($window, changeLocale) {

        var language = $window.navigator.userLanguage ||
            $window.navigator.language || 'en-US';
        changeLocale(language);

    });

    translations.factory('changeLocale', function($translate, languages, amMoment) {

        var determineLocale = function(languageCode) {
            if (languageCode.slice(0,2) === "en") {
                return languageCode.toLowerCase();
            } else {
                return languageCode.slice(0,2);
            }
        };

        var setLocale = function(language) {
            $translate.use(language);
            amMoment.changeLocale(determineLocale(language));
        };

        var sharesPrefix = function(lang1, lang2) {
            return lang1.slice(0,2) === lang2.slice(0,2);
        };

        return function(language) {

            // exact match
            if (languages.indexOf(language) > -1) {
                setLocale(language);
                return;
            }

            // prefix match
            for (var i = 0; i < languages.length; i++) {
                var knownLanguage = languages[i];
                if (sharesPrefix(knownLanguage, language)) {
                    setLocale(knownLanguage);
                    return;
                }
            }

            // default
            setLocale('en-US');
        };

    });

    translations.constant('languages', [
        'en-US',
        'da-DK'
    ]);

    translations.constant('enUsTranslations', {
        "N/A": "",
        "QUESTIONNAIRE": "Questionnaire",
        "LOGIN_FORM_USERNAME": "Username",
        "LOGIN_FORM_PASSWORD": "Password",
        "LOGIN_LOGIN_BUTTON": "Login",
        "LOGIN_FORM_USERNAME_ERROR_MESSAGE": "Username required.",
        "LOGIN_FORM_PASSWORD_ERROR_MESSAGE": "Password required.",
        "BAD_CREDENTIALS": "Wrong username or password",
        "ACCOUNT_LOCKED": "Your account has been locked. Contact your contact person.",
        "LOGGED_OUT": "You have been logged out, please log in again.",
        "NAVIGATION_BACK_BUTTON": "Back",
        "NAVIGATION_MAIN_MENU_BUTTON": "Menu",
        "NAVIGATION_LOGOUT_BUTTON": "Log out",
        "OPENTELE": "OpenTele",
        "MESSAGES_TITLE": "Messages",
        "MESSAGES_NEW_MESSAGE_BUTTON": "New message",
        "MESSAGES_NEW_MESSAGE": "New message",
        "MESSAGES_FORM_MESSAGE": "Message",
        "MESSAGES_FORM_MESSAGE_REQUIRED": "Message required",
        "MESSAGES_FORM_SEND_BUTTON": "Send",
        "MESSAGES_RECEIVED": 'Received',
        "MESSAGES_NO_MESSAGES": 'Here you can read and write messages. To write a message please press the "New message" button.',
        "MESSAGES_NO_THREADS": 'There are currently no ongoing conversations',
        "MESSAGES_ERROR_COULD_NOT_SEND": 'Failed to send message.',
        "ACKNOWLEDGEMENTS_TITLE": "Acknowledgements",
        "ACKNOWLEDGEMENTS_NO_ACKNOWLEDGEMENTS": 'There are currently no acknowledgements to show',
        "MY_MEASUREMENTS_TITLE": "My measurements",
        "MY_MEASUREMENTS_NO_MEASUREMENTS": "There are currently no available measurements",
        "MEASUREMENT_TITLE": "Measurement",
        "MEASUREMENT_TYPE_BLOOD_PRESSURE": "Blood pressure",
        "MEASUREMENT_TYPE_TEMPERATURE": "Temperature",
        "MEASUREMENT_TYPE_URINE": "Protein in urine",
        "MEASUREMENT_TYPE_URINE_GLUCOSE": "Glucose in urine",
        "MEASUREMENT_TYPE_PULSE": "Pulse",
        "MEASUREMENT_TYPE_WEIGHT": "Weight",
        "MEASUREMENT_TYPE_HEMOGLOBIN": "Hemoglobin",
        "MEASUREMENT_TYPE_SATURATION": "Saturation",
        "MEASUREMENT_TYPE_CRP": "CRP",
        "MEASUREMENT_TYPE_LUNG_FUNCTION": "Lung function",
        "MEASUREMENT_TYPE_BLOODSUGAR": "Blood sugar",
        "MEASUREMENT_TYPE_CONTINUOUS_BLOOD_SUGAR_MEASUREMENT": "Continuous blood sugar measurement",
        "MEASUREMENT_FORMAT_GENERAL_DATE": "%d/%m/%Y",
        "MEASUREMENT_FORMAT_STANDARD_DAY_DATE": "%I:%M %p",
        "SHOW_1_WEEK": "Show 1 week",
        "SHOW_1_MONTH": "Show 1 month",
        "SHOW_3_MONTHS": "Show 3 months",
        "SHOW_1_YEAR": "Show 1 year",
        "SHOW_ALL": "Show all",
        "TIMESTAMP": "Timestamp",
        "DATE": "Date",
        "BLOOD_SUGAR_MEASUREMENT": "Blood sugar measurement",
        "VALUE": "Value",
        "BEFORE": "Before",
        "AFTER": "After",
        "CONTROL": "Control",
        "OTHER": "Other",
        "BPM": "Beats per minute",
        "NO_MEASUREMENTS_AVAILABLE": "There are no measurements in the specified time interval",
        "MENU": "Menu",
        "Omit": "Omit",
        "Next": "Next",
        "Yes": "Yes",
        "No": "No",
        "OK": "OK",
        "Cancel": "Cancel",
        "MENU_PERFORM_MEASUREMENTS": "Perform measurements",
        "MENU_MESSAGES": "Messages",
        "MENU_ACKNOWLEDGEMENTS": "Acknowledgements",
        "MENU_MY_MEASUREMENTS": "My measurements",
        "MENU_CHANGE_PASSWORD": "Change password",
        "MENU_REAL_TIME_CTG": "Real-time CTG measurements",
        "CHOOSE_QUESTIONNAIRE": "Choose a questionnaire",
        "QUESTIONNAIRES_NO_QUESTIONNAIRES": "There are no available questionnaires",
        "PERFORM_MEASUREMENTS": "Perform measurements",
        "END_QUESTION_TEXT": "Would you like to send your measurements / replies?",
        "BLOOD_SUGAR_COUNT_ERROR_MESSAGE": "Blood sugar count required and should be a number.",
        "EDIT_TEXT_ELEMENT_ERROR_MESSAGE": "Field required",
        "URINE_LEVEL_NEGATIVE": "negative",
        "URINE_LEVEL_PLUS_MINUS": "+/-",
        "URINE_LEVEL_PLUS_ONE": "+1",
        "URINE_LEVEL_PLUS_TWO": "+2",
        "URINE_LEVEL_PLUS_THREE": "+3",
        "URINE_LEVEL_PLUS_FOUR": "+4",
        "URINE": "Enter urine protein level",
        "URINE_ERROR_MESSAGE": "Urine protein level required and should be a number",
        "GLUCOSE_URINE": "Enter urine glucose level",
        "GLUCOSE_URINE_ERROR_MESSAGE": "Urine glucose level required and should be a number",
        "LUNG_MONITOR_ERROR_MESSAGE": "FEV1 required and should be a number",
        "LUNG_MONITOR": "FEV1",
        "TEMPERATURE": "Temperature",
        "TEMPERATURE_ERROR_MESSAGE": "Temperature required and should be a number",
        "HAEMOGLOBIN_ERROR_MESSAGE": "Haemoglobin level required and should be a number",
        "HAEMOGLOBIN": "Haemoglobin",
        "BLOOD_SUGAR": "Blood sugar",
        "BEFORE_MEAL": "Before meal",
        "AFTER_MEAL": "After meal",
        "CONTINUOUS_BLOOD_SUGAR_MEASUREMENT": "Continuous blood sugar",
        "COULOMETER_READING": "Blood sugar measurement",
        "INSULIN": "Insulin",
        "INSULIN_TYPE": "Type",
        "INSULIN_UNITS": "Units",
        "EXERCISE": "Exercise",
        "EXERCISE_TYPE": "Type",
        "EXERCISE_DURATION_IN_MINUTES": "Duration",
        "EXERCISE_INTENSITY": "Intensity",
        "MEAL": "Meal",
        "MEAL_CARBO_GRAMS": "Grams of carbohydrates",
        "MEAL_FOOD_TYPE": "Meal",
        "STATE_OF_HEALTH": "State of health",
        "STATE_OF_HEALTH_STATE": "State of health",
        "GENERIC": "User defined",
        "GENERIC_INDICATED_EVENT": "Event",
        "UNKNOWN": "Unknown",
        "STANDARD_DAY": "Standard day",
        "DELAY_NODE_DESCRIPTION_LEFT_DOWN": "Time left",
        "DELAY_NODE_DESCRIPTION_LEFT_UP": "Time passed",
        "DELAY_NODE_DESCRIPTION_CENTER": "of",
        "DELAY_NODE_DESCRIPTION_RIGHT": "seconds.",
        "CRP_ERROR_MESSAGE": "Either <5 must be checked or a value entered in the input field.",
        "LT5": "<5",
        "OR_CRP": "or",
        "UPLOADING_REPLIES_TEXT": "Uploading measurements / replies",
        "UPLOADING_WAIT_TEXT": "Please wait...",
        "UPLOAD_FAILED_TEXT": "Upload of measurements / replies failed. Please check your network connection and try again.",
        "SEND_REPLIES_TITLE": "Send measurements / replies",
        "SEND_REPLIES_ACK_TEXT": "Measurements / replies received",
        "ERROR_TITLE": "Error",
        "OPENTELE_DOWN_TEXT": "Error communicating with OpenTele. Please try again later.",
        "OPENTELE_INVALID_QUESTIONNAIRE": "The selected questionnaire is currently not supported.",
        "OPENTELE_UNAVAILABLE_TEXT": "Could not connect to server. Please check your network connection and try again",
        "CHANGE_PASSWORD_TITLE": "Change password",
        "CHANGE_PASSWORD_FORM_NEW": "New password",
        "CHANGE_PASSWORD_FORM_REPEAT": "Repeat new password",
        "CHANGE_PASSWORD_FORM_CHANGE_BUTTON": "Change",
        "CHANGE_PASSWORD_FORM_ERROR_MATCH": "Passwords do not match",
        "CHANGE_PASSWORD_FORM_ERROR_LENGTH": "Password must not be blank",
        "CHANGE_PASSWORD_PROGRESS": "Changing password",
        "CHANGE_PASSWORD_EXPIRED": "Your password has expired or has been reset and must be changed"
    });

    translations.constant('daDkTranslations', {
        "N/A": "",
        "QUESTIONNAIRE": "Spørgeskema",
        "LOGIN_FORM_USERNAME": "Brugernavn",
        "LOGIN_FORM_PASSWORD": "Kodeord",
        "LOGIN_LOGIN_BUTTON": "Log på",
        "LOGIN_FORM_USERNAME_ERROR_MESSAGE": "Brugernavn krævet.",
        "LOGIN_FORM_PASSWORD_ERROR_MESSAGE": "Kodeord krævet.",
        "BAD_CREDENTIALS": "Forkert brugernavn eller kodeord",
        "ACCOUNT_LOCKED": "Din konto er blevet låst. Henvend dig til din kontaktperson.",
        "LOGGED_OUT": "Du er blevet logget af. Venligst log på igen.",
        "NAVIGATION_BACK_BUTTON": "Tilbage",
        "NAVIGATION_MAIN_MENU_BUTTON": "Menu",
        "NAVIGATION_LOGOUT_BUTTON": "Log af",
        "OPENTELE": "OpenTele",
        "MESSAGES_TITLE": "Beskeder",
        "MESSAGES_NEW_MESSAGE_BUTTON": "Ny besked",
        "MESSAGES_NEW_MESSAGE": "Ny besked",
        "MESSAGES_FORM_MESSAGE": "Besked",
        "MESSAGES_FORM_MESSAGE_REQUIRED": "Besked påkrævet",
        "MESSAGES_FORM_SEND_BUTTON": "Send",
        "MESSAGES_RECEIVED": 'Modtaget',
        "MESSAGES_NO_MESSAGES": 'Her kan du læse og skrive beskeder. For at skrive en besked skal du trykke på "Ny besked" knappen',
        "MESSAGES_NO_THREADS": 'Der er p.t. ingen samtaler at vise',
        "MESSAGES_ERROR_COULD_NOT_SEND": 'Kunne ikke sende besked.',
        "ACKNOWLEDGEMENTS_TITLE": "Kvitteringer",
        "ACKNOWLEDGEMENTS_NO_ACKNOWLEDGEMENTS": 'Der er p.t. ingen kvitteringer at vise',
        "MY_MEASUREMENTS_TITLE": "Mine målinger",
        "MY_MEASUREMENTS_NO_MEASUREMENTS": "Der er p.t. ingen tilgængelige målinger",
        "MEASUREMENT_TITLE": "Måling",
        "MEASUREMENT_TYPE_BLOOD_PRESSURE": "Blodtryk",
        "MEASUREMENT_TYPE_TEMPERATURE": "Temperatur",
        "MEASUREMENT_TYPE_URINE": "Protein i urin",
        "MEASUREMENT_TYPE_URINE_GLUCOSE": "Glukose i urin",
        "MEASUREMENT_TYPE_PULSE": "Puls",
        "MEASUREMENT_TYPE_WEIGHT": "Vægt",
        "MEASUREMENT_TYPE_HEMOGLOBIN": "Hæmoglobin",
        "MEASUREMENT_TYPE_SATURATION": "Iltmætning",
        "MEASUREMENT_TYPE_CRP": "CRP",
        "MEASUREMENT_TYPE_LUNG_FUNCTION": "Lungefunktion",
        "MEASUREMENT_TYPE_BLOODSUGAR": "Blodsukker",
        "MEASUREMENT_TYPE_CONTINUOUS_BLOOD_SUGAR_MEASUREMENT": "Kontinuert blodsukkermåling",
        "MEASUREMENT_FORMAT_GENERAL_DATE": "%d/%m/%Y",
        "MEASUREMENT_FORMAT_STANDARD_DAY_DATE": "%H:%M",
        "SHOW_1_WEEK": "Vis 1 uge",
        "SHOW_1_MONTH": "Vis 1 måned",
        "SHOW_3_MONTHS": "Vis 3 måneder",
        "SHOW_1_YEAR": "Vis 1 år",
        "SHOW_ALL": "Vis alt",
        "TIMESTAMP": "Tidspunkt",
        "DATE": "Dato",
        "BLOOD_SUGAR_MEASUREMENT": "Blodsukkermåling",
        "VALUE": "Værdi",
        "BEFORE": "Før",
        "AFTER": "Efter",
        "CONTROL": "Kontrol",
        "OTHER": "Andet",
        "BPM": "Slag i minuttet",
        "NO_MEASUREMENTS_AVAILABLE": "Der er ingen målinger i det valgte tidsinterval",
        "MENU": "Menu",
        "Omit": "Undlad",
        "Next": "Næste",
        "Yes": "Ja",
        "No": "Nej",
        "OK": "OK",
        "Cancel": "Annuller",
        "MENU_PERFORM_MEASUREMENTS": "Gennemfør målinger",
        "MENU_MESSAGES": "Beskeder",
        "MENU_ACKNOWLEDGEMENTS": "Kvitteringer",
        "MENU_MY_MEASUREMENTS": "Mine målinger",
        "MENU_CHANGE_PASSWORD": "Skift adgangskode",
        "MENU_REAL_TIME_CTG": "Realtids CTG målinger",
        "CHOOSE_QUESTIONNAIRE": "Vælg et spørgeskema",
        "QUESTIONNAIRES_NO_QUESTIONNAIRES": "Der er ingen tilgængelige spørgeskemaer",
        "PERFORM_MEASUREMENTS": "Gennemfør målinger",
        "END_QUESTION_TEXT": "Vil du sende dine målinger / svar?",
        "BLOOD_SUGAR_COUNT_ERROR_MESSAGE": "Blodsukker tal krævet og skal være et tal.",
        "EDIT_TEXT_ELEMENT_ERROR_MESSAGE": "Feltet skal udfyldes",
        "URINE_LEVEL_NEGATIVE": "negativ",
        "URINE_LEVEL_PLUS_MINUS": "+/-",
        "URINE_LEVEL_PLUS_ONE": "+1",
        "URINE_LEVEL_PLUS_TWO": "+2",
        "URINE_LEVEL_PLUS_THREE": "+3",
        "URINE_LEVEL_PLUS_FOUR": "+4",
        "URINE": "Angiv urin proteintal",
        "URINE_ERROR_MESSAGE": "Urin proteintal skal udfyldes",
        "GLUCOSE_URINE": "Angiv urin glukosetal",
        "GLUCOSE_URINE_ERROR_MESSAGE": "Urin glukosetal skal udfyldes",
        "LUNG_MONITOR_ERROR_MESSAGE": "FEV1 skal udfyldes og skal være et tal",
        "LUNG_MONITOR": "FEV1",
        "TEMPERATURE": "Temperatur",
        "TEMPERATURE_ERROR_MESSAGE": "Temperatur skal udfyldes og skal være et tal",
        "HAEMOGLOBIN_ERROR_MESSAGE": "Hæmoglobin indhold skal udfyldes og skal være et tal",
        "HAEMOGLOBIN": "Hæmoglobin",
        "BLOOD_SUGAR": "Blodsukker",
        "BEFORE_MEAL": "Før måltid",
        "AFTER_MEAL": "Efter måltid",
        "CONTINUOUS_BLOOD_SUGAR_MEASUREMENT": "Kontinuert blodsukker",
        "COULOMETER_READING": "Blodsukkermåling",
        "INSULIN": "Insulin",
        "INSULIN_TYPE": "Type",
        "INSULIN_UNITS": "Enheder",
        "EXERCISE": "Motion",
        "EXERCISE_TYPE": "Type",
        "EXERCISE_DURATION_IN_MINUTES": "Varighed",
        "EXERCISE_INTENSITY": "Intensitet",
        "MEAL": "Måltid",
        "MEAL_CARBO_GRAMS": "Gram kulhydrat",
        "MEAL_FOOD_TYPE": "Måltid",
        "STATE_OF_HEALTH": "Helbredstilstand",
        "STATE_OF_HEALTH_STATE": "Helbredstilstand",
        "GENERIC": "Brugerdefineret",
        "GENERIC_INDICATED_EVENT": "Hændelse",
        "UNKNOWN": "Ukendt",
        "STANDARD_DAY": "Standarddag",
        "DELAY_NODE_DESCRIPTION_LEFT_DOWN": "Tid tilbage",
        "DELAY_NODE_DESCRIPTION_LEFT_UP": "Tid gået",
        "DELAY_NODE_DESCRIPTION_CENTER": "af",
        "DELAY_NODE_DESCRIPTION_RIGHT": "sekunder.",
        "CRP_ERROR_MESSAGE": "Enten skal <5 være tjekket eller også skal der indtastes en værdi i inputfeltet",
        "LT5": "<5",
        "OR_CRP": "eller",
        "UPLOADING_REPLIES_TEXT": "Sender målinger / svar",
        "UPLOADING_WAIT_TEXT": "Vent venligst...",
        "UPLOAD_FAILED_TEXT": "Indsendelse af måling/svar fejlede. Tjek evt. netværksforbindelsen og prøv igen.",
        "SEND_REPLIES_TITLE": "Send målinger / svar",
        "SEND_REPLIES_ACK_TEXT": "Målinger / svar modtaget",
        "ERROR_TITLE": "Fejl",
        "OPENTELE_DOWN_TEXT": "Fejl ved kommunikation med OpenTele. Prøv igen senere.",
        "OPENTELE_INVALID_QUESTIONNAIRE": "Det valgte spørgeskema er ikke understøttet på nuværende tidspunkt.",
        "OPENTELE_UNAVAILABLE_TEXT": "Kunne ikke kontakte serveren. Tjek din netværksforbindelse og prøv igen.",
        "CHANGE_PASSWORD_TITLE": "Skift adgangskode",
        "CHANGE_PASSWORD_FORM_NEW": "Ny adgangskode",
        "CHANGE_PASSWORD_FORM_REPEAT": "Gentag ny adgangskode",
        "CHANGE_PASSWORD_FORM_CHANGE_BUTTON": "Skift",
        "CHANGE_PASSWORD_FORM_ERROR_MATCH": "De indtastede kodeord skal være ens",
        "CHANGE_PASSWORD_FORM_ERROR_LENGTH": "Kodeord må ikke være blankt",
        "CHANGE_PASSWORD_PROGRESS": "Skifter kodeord",
        "CHANGE_PASSWORD_EXPIRED": "Dit kodeord er udløbet eller er blevet nulstillet og skal skiftes"
    });

}());
