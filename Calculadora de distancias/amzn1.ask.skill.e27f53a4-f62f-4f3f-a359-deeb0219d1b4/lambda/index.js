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
            WELCOME_MESSAGE: 'Welcome, I can convert distance units meters and centimeters to miles, yards, feet and inches, do the test by saying "convert 7 meters to yards". What conversion would you like to make?',
            ERROR_EXTENT: 'The unit of measure is not available',
            ERROR_CONVERSION: 'The amount you want to convert is not available or not supported, it must be greater than zero',
            HELP: 'I can convert units of measurement to the English system, try saying "convert 7 meters to milles"',
            CANCEL: 'It was a pleasure helping you, bye.',
            FALLBACK: 'Im sorry, I dont understand what you said.',
            ERROR_HANDLER: 'Im sorry, I had problems making your request. try again',
            RESPUNO: 'in',
            RESPDOS: 'is equal to'
        }
    },
    es:{
        translation: {
            WELCOME_MESSAGE: 'Bienvenido, puedo convertir unidades de distancias metros y centimetros a millas, yardas, pies y pulgadas, haz la prueba diciendo "convierte 7 metros a yardas". ¿que conversion te gustaria realizar?',
            ERROR_EXTENT: 'La unidad de medida no se encuentra disponible.',
            ERROR_CONVERSION: 'La cantidad que desas convertir no esta disponible o no es compatible, debes ser superior que cero.',
            HELP: 'Puedo convertir unidades de medida al sitema ingles, prueba diciendo "convierte 7 metros a millas"',
            CANCEL: 'Fue un gusto servirte, Adios, hasta la proxima.',
            FALLBACK:'Perdon, no entiendi lo que has dijistes.',
            ERROR_HANDLER: 'Lo siento, tuve problemas al realizar tu peticion. Inténtalo de nuevo.',
            RESPUNO: 'en',
            RESPDOS: 'es igual a'
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

const ConvertUnidHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ConvertUnid'
    );
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const error_Ex = requestAttributes.t('ERROR_EXTENT');
    const error_Con = requestAttributes.t('ERROR_CONVERSION');
    const resp_uno = requestAttributes.t('RESPUNO');
    const resp_dos = requestAttributes.t('RESPDOS');
    
    let conversion;
    let resultado;
    let respuesta;
    
    const slots = handlerInput.requestEnvelope.request.intent.slots;

    const valor = parseFloat(slots.valor.value);
    const unidadOrigen = slots.unidad_origen.value;
    const unidadDestino = slots.unidad_destino.value;

    if(valor > 0){
        if (unidadOrigen === 'metro' || unidadOrigen === 'metros' || unidadOrigen === 'meter' || unidadOrigen === 'meters') {
            if (unidadDestino === 'pulgada' || unidadDestino === 'pulgadas' || unidadDestino === 'inch' || unidadDestino === 'inches') {
                conversion = valor * 39.37;
                resultado = conversion;
            } else if (unidadDestino === 'pie' || unidadDestino === 'pies' || unidadDestino === 'foot' || unidadDestino === 'feet') {
                conversion = valor * 3.281;
                resultado = conversion;
            } else if (unidadDestino === 'yarda' || unidadDestino === 'yardas' || unidadDestino === 'yard' || unidadDestino === 'yards') {
                conversion = valor * 1.094;
                resultado = conversion;
            } else if (unidadDestino === 'milla' || unidadDestino === 'millas' || unidadDestino === 'mille' || unidadDestino === 'milles') {
                conversion = valor * 0.0006214;
                resultado = conversion;
            }
        } 
        
        if (unidadOrigen === 'centímetro' || unidadOrigen === 'centímetros' || unidadOrigen === 'centimeters' || unidadOrigen === 'centimeter') {
            if (unidadDestino === 'pulgada' || unidadDestino === 'pulgadas' || unidadDestino === 'convert three forty meters to milles' || unidadDestino === 'inches') {
                conversion = valor * 0.3937;
                resultado = conversion;
            } else if (unidadDestino === 'pie' || unidadDestino === 'pies' || unidadDestino === 'foot' || unidadDestino === 'feet') {
                conversion = valor * 0.0328084; 
                resultado = conversion;
            } else if (unidadDestino === 'yarda' || unidadDestino === 'yardas' || unidadDestino === 'yard' || unidadDestino === 'yards') {
                conversion = valor * 0.01094;
                resultado = conversion;
            } else if (unidadDestino === 'milla' || unidadDestino === 'millas' || unidadDestino === 'mille' || unidadDestino === 'milles') {
                conversion = valor * 0.0000062137;
                resultado = conversion;
            }
        }
        if (!resultado) {
          resultado = error_Ex;
        }
        respuesta = valor + ' ' + unidadOrigen + ' ' + resp_uno + ' ' + unidadDestino + ' ' + resp_dos + ' ' +resultado + ' ' + unidadDestino;
    }else{
        respuesta = error_Con;
    }

    return handlerInput.responseBuilder
      .speak(respuesta)
      .withShouldEndSession(false) // Mantener la sesión abierta
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
        const speakHelp = requestAttributes.t('HELP');

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
        const speakCancel = requestAttributes.t('CANCEL');
        
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
        ConvertUnidHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();