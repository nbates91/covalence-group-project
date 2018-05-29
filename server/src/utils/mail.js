import mailgunLoader from 'mailgun-js';
import { config } from "../config"

let mailgun = mailgunLoader({ apiKey: config.MAILGUN_API_KEY, domain: 'sandbox044092ed20d046f3b8b985d9c2fbe2d7.mailgun.org' });

function sendEmail(to, from, subject, content) {
    let data = {
        from,
        to,
        subject,
        html: content
    };

    return mailgun.messages().send(data);
}

export { sendEmail };