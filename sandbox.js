// // email template: template_3ybytk8
// // service id: service_xgureja
// // private key: F-EmoNZk7867nR6RmiDT
// const emailjs = require('emailjs-com')
global.XMLHttpRequest = require('xhr2');

// const SERVICE_ID = "service_xgureja";
// const TEMPLATE_ID = "template_3ybytk8";
// const PUBLIC_KEY = "F-EmoNZk7867nR6RmiDT"
// const templateParams = {
//     to_name: "hehe@gmail.com",
//     message: "Congratz your email has been registered"

// }
// async function sendEmail() {
//     try {
//         await emailjs.send(
//             "service_xgureja",
//             "template_3ybytk8",
//             {
//                 to_name: "Ainur",
//                 to_email: "ainurmoh@gmail.com",
//             },
//             "PJdaPEBKLWcbEVN7k"
//         )
//     } catch (error) {
//         console.log(error)
//     }
// }

// sendEmail()
const emailjs = require('emailjs-com')

async function sendMail() {
    try {
        await emailjs.send(
          'service_ecqf1wi',
          'template_3ybytk8',
            {
                to_name: "Ainur",
                to_email: "ainurmoh@gmail.com",
                message: "Congratz your email has been registered"
            },
            "vlpOkw-WxicMewCqJ", 
        );
        console.log('SUCCESS!');
      } catch (err) {
      
        console.log('ERROR', err);
      }
}
sendMail()