import FormData from 'form-data'
import config from 'config'
import axios from "axios"


export const sendEmail = async(
    to:string,
    templateName: string,
    subject: string,
    templateVars: Record<string, any> = {},
) => {
    try {
        const form = new FormData();
        form.append('to', to);
        form.append('template', templateName);
        form.append('subject', subject);
        form.append(
            'from',
            'mailgun@sandbox0792ac8c95274cb8aedfcce0759d2b1c.mailgun.org'
        );
            Object.keys(templateVars).forEach((key)=>{
                form.append(`v:${key}`, templateVars[key]);
            });

            const username = 'api';
            const password = config.get('emailService.privateKey');
            const token = Buffer.from(`${username}:${password}`).toString('base64');
            const response = await axios({
                method: 'post',
                url: `http://api.mailgun.net/v3/${config.get('emailService.testDomin')}/message`,
                headers: {
                    Authorization: `Basic ${token}`,
                    contentType: 'multipart/formdata'
                },
                data : form,
            });
            return response;
        
    } catch (error) {
        console.error(error);
        
    }        
};