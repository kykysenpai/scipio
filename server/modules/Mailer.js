import nodemailer from 'nodemailer';
import Config from "../config/Config";
import Logger from "./Logger";
import hbs from 'nodemailer-express-handlebars';
import Paths from "../config/constants/Paths";

Logger.info("Setting up mail module...");

const transporter = nodemailer.createTransport({
    host: Config.MAIL_HOST,
    auth:{
        user: Config.MAIL_USER,
        pass: Config.MAIL_PASSWORD
    }
});

transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        layoutsDir: Paths.VIEWS +'/email/'
    },
    viewPath: Paths.VIEWS + '/email/',
    extName: '.hbs'
}));


const sendAccountConfirmation = async (to, url, login) =>{
    return await transporter.sendMail({
        from: Config.MAIL_FROM,
        to: to,
        subject: "Your account confirmation on the Scipio application",
        template: 'AccountConfirmation',
        context:{
            url: url,
            login: login
        }
    })
};

export default {sendAccountConfirmation}