import https from "https"
import dotenv from "dotenv"

export const SendMessageWhatsApp = (textResponse, number) => {

    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": textResponse
            }
        }
    )

    const options = {
        host: "graph.facebook.com",
        path: "/v16.0/121502884258614/messages",
        method: "post",
        body: data,
        headers: {
            "Content-Type" : "application/json",
            Autorization: process.env.BARIER
        }
    }

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d)
        })
    })

    req.on("error", error => {
        console.error(error)
    })

    req.write(data)

    req.end()
}