# NodeJsGoogleTranslateAPI 🌎

It a free service api for google translate that has unlimited request.

#### Usage 📒
`git clone git@github.com:Novsochetra/NodeJsGoogleTranslateAPI.git`

`yarn install`

`yarn start:dev`

#### Example 📱
`
http://localhost:3000/api/translates?q=hello&from=en&to=km
`

acceptable params:

**q** is for word search
**from** is the first language
**to** is the second language 

#### Sample Response

`
{
    "data": {
        "translatedWord": "សួស្តី",
        "definitions": {
            "នាម": [
                "an utterance of “hello”; a greeting.",
                "she was getting polite nods and hellos from people"
            ],
            "ឧទានសព្ទ": [
                "used as a greeting or to begin a telephone conversation.",
                "hello there, Katie!"
            ],
            "កិរិយា": [
                "say or shout “hello”; greet someone.",
                null
            ]
        },
        "example": [
            "<b>hello</b>, what's this?",
            "I said <b>hello</b> to him",
            "she refused and, <b>hello</b>, I'm her manager!",
            "<b>hello</b> there, Katie!",
            "<b>hello</b>, is anybody in?"
        ]
    },
    "status": 200
}
`

#### Production URL


https://node-google-translate-api.herokuapp.com/api/translates?q=other&from=en&to=km
