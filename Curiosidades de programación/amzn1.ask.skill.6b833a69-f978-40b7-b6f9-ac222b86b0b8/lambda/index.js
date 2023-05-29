/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const languageFacts = {
    "javascript":[
        "Fue creado por Brendan Eich en 1995, mientras trabajaba en Netscape Communications Corporation.",
        "JavaScript es el lenguaje de programación más popular en la web, utilizado en alrededor del 95% de los sitios.",
        "Una de las características más importantes de JavaScript es su capacidad para crear interactividad en las páginas web.",
        "La sintaxis de JavaScript es similar a la de Java y C++, pero también tiene influencia del lenguaje de script Perl."
        ],
    "python":[
        "Python es un lenguaje de programación de alto nivel y fácil de aprender, diseñado para enfatizar la legibilidad del código.",
        "Python es un lenguaje interpretado, lo que significa que el código se ejecuta directamente en una máquina virtual en lugar de ser compilado antes de la ejecución.",
        "Python es utilizado por grandes empresas como Google, Facebook, Dropbox y Netflix, entre otras."
        ],
    "typescript":[
        "TypeScript fue lanzado por Microsoft en octubre de 2012 como un lenguaje de programación de código abierto.",
        "TypeScript es un lenguaje de programación de tipado estático, lo que significa que las variables deben ser definidas con un tipo específico antes de su uso.",
        "TypeScript es una extensión de JavaScript, lo que significa que todo el código JavaScript es también código TypeScript válido."
        ],
    "java":[
        "Java fue creado en 1995 por James Gosling de Sun Microsystems (ahora propiedad de Oracle Corporation).",
        "Java fue diseñado para ser un lenguaje de programación simple, orientado a objetos y portátil, lo que significa que el código Java se puede ejecutar en cualquier plataforma que tenga una máquina virtual Java (JVM) instalada.",
        "Java es uno de los lenguajes de programación más utilizados en todo el mundo, especialmente para el desarrollo de aplicaciones empresariales y web."
        ],
    "cmasmas":[
        "C++ es un lenguaje de programación compilado, lo que significa que el código debe ser compilado antes de su ejecución.",
        "C++ es utilizado por grandes empresas como Microsoft, Amazon, y Google, entre otras.",
        "C++ es uno de los lenguajes de programación más utilizados en la industria del juego, ya que permite a los desarrolladores crear juegos de alto rendimiento y gráficos avanzados."
            ],
    "csharp":[
        "C# fue creado por Microsoft en 2000 como parte de su plataforma .NET.",
        "C# cuenta con una amplia comunidad de desarrolladores y una gran cantidad de recursos disponibles para ayudar a los nuevos programadores a aprender el lenguaje.",
        "C# es compatible con el polimorfismo, que permite a los desarrolladores crear clases y objetos que pueden tener diferentes comportamientos en función de los datos de entrada."
        ]
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola bienvenido, puedo darte datos curiosos sobre lenguajes de programación';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CustomLanguageIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "CustomLanguageIntent"
    );
  },
  handle(handlerInput) {
    const { language } = handlerInput.requestEnvelope.request.intent.slots;
    let response;
    const  repromptOutput = "¿Desea otra cosa?";
    if (language && languageFacts[language.value]) {
      response =
        languageFacts[language.value][
          Math.floor(Math.random() * languageFacts[language.value].length)
        ];
        
   
        
    } else {
      response =
        "No tengo información sobre el lenguaje que has mencionado, prueba con otro";
    }
    return handlerInput.responseBuilder
      .speak(response + "      Desea otra cosa?")
      //.reprompt("Desea otra cosa?")
      .reprompt(repromptOutput)
      .getResponse();
  },
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedo darte datos curiosos sobre lenguajes de programación, prueba diciendo curiosidad Python';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        const speakOutput = 'Adios, hasta la proxima';

        return handlerInput.responseBuilder
            .speak(speakOutput)
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
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        const speakOutput = 'Lo siento, puedes repetirlo.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
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
        CustomLanguageIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();