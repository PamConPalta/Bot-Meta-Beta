import fs from "fs"
import { SendMessageWhatsApp } from "../services/whatsappService.js"
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"))

export const VerifyToken = (req, res) => {

    try {
        var accessToken = "VABJSDJAS234EASDASDA"
        var token = req.query["hub_verify_token"]
        var challenge = req.query["hub.challenge"]

        if(challenge != null && token != null && token == accessToken){
            res.send(challenge)
        }
    } catch (e) {
        res.status(400).send()
    }
}

export const ReceivedMessage = (req, res) => {

    try{
        var entry = (req.body["entry"])[0]
        var changes = (entry["changes"])[0]
        var value = changes["value"]
        var messageObject = value["messages"]

        if(typeof messageObject != undefined){
            var message = messageObject[0]
            var number = message["from"]
            var text = GetTextUser(message)
            console.log(text)
            myConsole.log(text)
            SendMessageWhatsApp("El usuario dijo :" + text, number)
        }
        res.send("EVENT_RECEIVED")
    } catch (e) {
        console.error(e.error)
        res.send("EVENT_RECEIVED")
    }
}

const GetTextUser = (message) => {
    var text = ""

    var typeMessage = message["type"]

    if(typeMessage == "text"){

        text = (message["text"])["body"]

    } else if(typeMessage == "interactive"){

        var interactiveObject = message["interactive"]
        var typeInteractive = interactiveObject["type"]

        if(typeInteractive == "button_reply"){

            text = (interactiveObject["button_reply"])["title"]

        } else if (typeInteractive == "list_reply"){

            text = (interactiveObject["list_reply"])["title"]

        } else{
            myConsole.log("Sin mensaje")
        }
    } else {
        myConsole.log("Sin mensaje")
    }
    return text
}