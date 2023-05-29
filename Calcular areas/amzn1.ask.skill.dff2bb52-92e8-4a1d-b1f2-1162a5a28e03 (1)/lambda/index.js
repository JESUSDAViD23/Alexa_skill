/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Welcome, I can calculate the area of a triangle, square or circle, which one would you like to try?',
            HELP_MESSAGE: 'Hi, try calculating the area of a rectangle with length fifteen and width four',
            BYE_MESSAGE: 'See you soon',
            FALLBACK: 'I am sorry, I don t understand what you said',
            ERRORC_MESSAGE:'The radius value must be greater than zero. Please provide a valid value.',
            AREA_MESSAGE: 'The area is',
            ERRORT_MESSAGE: 'The base and height values must be greater than zero. Please provide valid values.',
            ERRORR_MESSAGE: 'The length and width must be greater than zero. Please provide valid values.'
            
        }
    },
    es:{
        translation: {
            WELCOME_MESSAGE: 'Bienvenido, puedo calcular el area de un triangulo, cuadrado o circulo, cual quisieras probar?',
            HELP_MESSAGE: 'Hola, intenta probar con calcular el área de un rectangulo con largo quince y ancho cuatro',
            BYE_MESSAGE: 'adios, hasta la proxima',
            FALLBACK:'Perdon, no entiendi lo que dijistes.',
            ERRORC_MESSAGE:'El valor del radio debe ser mayor que cero. Por favor, proporciona un valor válido.',
            AREA_MESSAGE: 'El area es ',
            ERRORT_MESSAGE: 'El valor de la base y la altura deben ser mayores que cero. Por favor, proporciona valores válidos.',
            ERRORR_MESSAGE: 'El valor del largo y el ancho deben ser mayores que cero. Por favor, proporciona valores válidos.'
        }
    }
}




const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const CalcularAreaCirculoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CalcularAreaCirculoIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        
        const radio = slots.radio.value
        if (radio <= 0) {
            const errorcicle = requestAttributes.t('ERRORC_MESSAGE');
        return handlerInput.responseBuilder
        .speak(errorcicle)
        .getResponse();
        }
        const area_mesa = requestAttributes.t('AREA_MESSAGE');
        const area = Math.PI * Math.pow(radio, 2);
        const speakOutput = `${area_mesa} ${area}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const CalcularAreaTrianguloIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CalcularTrianguloIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        
        const base = slots.base.value
        const altura = slots.altura.value
        
        if (base <= 0 || altura <= 0) {
            const errortri = requestAttributes.t('ERRORT_MESSAGE');
      return handlerInput.responseBuilder
        .speak(errortri)
        .getResponse();
    }

    // Cálculo del área del triángulo
    const area_mesa = requestAttributes.t('AREA_MESSAGE');
    const area = (base * altura) / 2;
        const speakOutput = `${area_mesa} ${area}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .withShouldEndSession(false)
            .getResponse();
    }
};

const CalcularAreaRectanguloIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CalcularAreaRectanguloIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        
        const largo = slots.largo.value
        const ancho = slots.ancho.value
        if (largo <= 0 || ancho <= 0) {
        const errorrect = requestAttributes.t('ERRORR_MESSAGE');
        return handlerInput.responseBuilder
        .speak()
        .getResponse();
        }

    // Cálculo del área del rectángulo
    const area_mesa = requestAttributes.t('AREA_MESSAGE');
    const area = largo * ancho;
        const speakOutput = `${area_mesa} ${area}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .withShouldEndSession(false)
            .getResponse();
    }
};




const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakHelp = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakHelp)
            .reprompt(speakHelp)
            .getResponse();
    }
};


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakCancel = requestAttributes.t('BYE_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakCancel)
            .getResponse();
    }
};

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakFallback = requestAttributes.t('FALLBACK');

        return handlerInput.responseBuilder
            .speak(speakFallback)
            .reprompt(speakFallback)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput){
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const LocalizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en',
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true
        });
        
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function(...args){
            return LocalizationClient.t(...args);
        }
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        CalcularAreaCirculoIntentHandler,
        CalcularAreaTrianguloIntentHandler,
        CalcularAreaRectanguloIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();