const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'vincenzo89@ethereal.email',
        pass: 'BYkDqQgApWWdxGNMyX'
    }
});

const send = (info)=>{

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const emailProcessor = async (email,pin) =>{
    try {
        let emailInfo = await transporter.sendMail({
            from: '"CRM Ticket Management" <vincenzo89@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: "Password Reset pin ✔", // Subject line
            text: `Hello, please find the reset pin ${pin} which is valid for 1 day`, // plain text body
            html: `<b>Hello ${email}</b> 
            <br> <p>please find the reset pin ${pin}</p>
            <span> which is valid for 1 day </span>
            `, // html body
          });
          send(emailInfo);
    } catch (error) {
        console.log(error)
    }
}

const emailProcessorForUpdatePassword = async (email) =>{
    try {
        let emailInfo = await transporter.sendMail({
            from: '"CRM Ticket Management" <vincenzo89@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: "Password updated successfully ✔", // Subject line
            text: `password updated successfully. please login with new password`, // plain text body
            html: `<b>Password</b> 
            <br> 
            <span>updated successfully</span>
            `, // html body
          });
          send(emailInfo);
    } catch (error) {
        console.log(error)
    }
}


const newUserVerification = async (email,id) =>{
    try {
        let emailInfo = await transporter.sendMail({
            from: '"CRM Ticket Management" <vincenzo89@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: " Verification Mail ✔", // Subject line
            html: `<b>Verify Link</b> 
            <br> 
            <span><a href="http://localhost:3000/verify_user/${id}/${email}">Click Here</a></span>
            `, // html body
          });
          
          send(emailInfo);
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    emailProcessor,
    emailProcessorForUpdatePassword,
    newUserVerification
}