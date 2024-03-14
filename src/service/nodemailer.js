import nodemailer from "nodemailer"
import Mailgen from "mailgen";
import dayjs from "dayjs";
import { NODEMAILER_PASS, NODEMAILER_USER } from "../config/config.js";



export const sendEmailValidation = async (token,email, first_name) => {
    //ENVÍO DE EMAIL AL REGISTRARSE
    let configNodemailer = {
      service: "gmail",
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
      },
    };
    let transporter = nodemailer.createTransport(configNodemailer);
  
    let MailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        //encabezado
        name: "Libreta Junguiana",
        link: "http://libreta-junguiana.com", //link clikeable a pagina web
        // logo: "https://github.com/Micromundofede22/ReciclApp/blob/main/src/public/logo-reciclapp.jpeg",
        // logoHeight: "30px"
      },
    });
    let content = {
      //cuerpo del mensaje
      body: {
        name: first_name,
        intro: `La Libreta Junguiana te espera para que escribas en ellas todos tus sueños y sincronicidades.  Haz click en el siguiente botón para verificar tu cuenta.`,
        action: {
          button: {
            color: "#22BC66",
            text: "Confirme su cuenta",
            link: `http://localhost:8080/api/session/verify-user/${token}`,
          },
        },
        dictionary: {
          Fecha: dayjs().format("DD/MM/YYYY HH:mm"),
        },
        signature: false,
      },
    };
    let mail = MailGenerator.generate(content);
  
    let message = {
      from: NODEMAILER_USER,
      to: email,
      subject: "🍀Validación de cuenta🍀",
      html: mail,
    };
    try {
      await transporter.sendMail(message);
    } catch (error) {
      console.log(error);
    }
  };