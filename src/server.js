const dotenv = require('dotenv')
// import { WhatsAppProvider } from "./main/adapters/whatsAppProvider";
dotenv.config()

const PORT = parseInt(`${process.env.PORT || 3000}`)

const app = require('./app')

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`))

// const sessioName = 'session-woodstock';

// const whatsAppProvider = new WhatsAppProvider(sessioName);

// whatsAppProvider.init();
