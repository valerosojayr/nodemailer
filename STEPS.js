Nodemailer - Send Emails From Your Node.js App

1. Download the Contact Form
   from https://github.com/bradtraversy/nodecontactform

2. We are creating a simple node js in express applicaton and
   implement nodemailer. Mailing module for node js.

   We want to fill a form, send it to go to a specific Email
   Address that we specify in the application.

   Remarks:
   Go to https://nodemailer.com/about/
   As far as smptp you can use gmail if you  want.
   You may have some issue. In fact if you click usage>using
   Gmail. It would say by no means a preferable solution unless you are using
   OAuth2 authentication.
   Gmail has a concept of less secure app. That is what your application
   can be considered if you use gmail smtp without OAuth2 authentication..

   For testing staff it's total fine but not in production application.

   Basic Email Settings
    Incoming Server:
    Outgoing Server:
    Username:
    Password:
    Incoming Port:
    Outgoing Mail server (SMPT) Port: 587
    SSL:
    SMTP Authentication Required
    Secure Authentication or SPA needs to be turned off


   Gmail SMTP Setup settings
    SMTP username: Your Gmail address
    SMTP password: Your Gmail password
    SMTP server address: smtp.gmail.com
    Gmail SMTP port (TLS): 587
    SMTP port (SSL): 465
    SMTP TLS/SSL required: yes


STEPS STARTS HERE

1. Create Project Folder
2. Right Click> Project Folder>npm init

{
  "name": "Project Name",
  "version": "1.0.0",
  "description": "Project Description",
  "main": "app.js", //Main Module
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jay-R Valeroso",  //Your Name
  "license": "MIT",
  "dependencies": {
    "body-parser": "^1.17.2",
    "express": "^4.15.4",
    "express-handlebars": "^3.0.0",
    "nodemailer": "^4.1.0"
  }
}

3. npm install --save express body-parser express-handlebars nodemailer
   npm install -g nodemon

5. create our app.js file

   const express = require ("express");
   const bodyParser = require ("body-parser");
   const exphbs = require ("express-handlebars");
   const nodemailer = require ("nodemailer");

   const app = express();

   app.get("/", (req, res)=>{
     res.send("Hello");
   });

   app.listen(3000, ()=>{consoloe.log("Server Started...")});

7. Open Browser, localhost:3000
   Check if you are connected to Port 3000


8. Right Above our app.get route. Let' set our view engine

   //View Engine setup
   app.engine ("handlebars", exphbs());
   app.set("view engine", "handlebars");

9. Afer View Engine Setup, let's setup Body Parser.

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

10. Create a Folder called public
      This is where we are goint to put our CSS file, Image, Client Side JS
      etc.

11. Inside of public Folder, create css Folder

12. Let's Create a route for our Static folder
    app.use ("/public", express.static(path.join(__dirname,"public")));

    Remarks:
    __dirname directory
    public is the name of our Folder

13. Then let's require a path core module to deal with path files

    const path = require ("path");

14. Right Click the Project Folder>GithBash>nodemon

15. Create a Folder called views
    Inside create layouts Folder
    Inside the layouts FOLDER, create main.handlebars

    and inside the views Folder
        paste the contact.handlebars

    Remarks:
    contact.handlebars and main.handlebar are the same codes

16. In our home route handler.
    From this
    Change this  res.send("Hello");
    To this
    res.render("contact");  // this is our contact.handlebars files
                            // Can also put main.handlebars
                            // we are rendering this module

17. We have a Boiler Plate, pre made
    Copy the stye.css file and put inside of our css Folder.
    Also go to views folder>contact.handlebars>Copy all the Code from our.
    index.html Boiler Plate, and paste in here.

    copy the contact.handlebars file and save inside layouts Folder
    change the filename to main.handlebars

18. in contact.handlebars file
    change the style link to below link.

    <link rel="stylesheet" href="public/css/style.css">

16. Go to contact.handlebars
    In form tag update the code like below.

    <form method="POST" action="send">

    and upte the submit button tag, should be like this.

    <button type="submit">Submit</button>

17. let's add var that says email sent. On top of our form in main.handlebars add this code.
    In handlebars we use double curly braces and we put msg.

     {{msg}}

   Remarks:
   The animation that you  can see is coming from animate.css

   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />

   and we added the below animated class.

   <div class="wrapper animated bounceInLeft">

//NOT WORKING FROM HERE...

18. Let's now go to app.js
    Let's create a post route fo the Submission.

    app.post('/send', (req, res) => {
      console.log(req.body)
    });

    Go to Browser>localhost:3000
    Fillup the Form>Submit

    See if the result logs into the terminal.
    Now that we know that it works, we need to implement our nodemailer.
    From our post send route, let's remove   console.log(req.body)

19. Before we implement our nodemailer. Let's make an output string that is going
    to be in the body of the email.


    Inside of the below code, we are going to put our output object in a template string.

    app.post('/send', (req, res) => {

    });

    //Output Object in a Template String.
         Remarks: Template String is back tick not single or double quotes.
         We are creating HTML here...
         Make sure all the name here like Name, Company, Email and Phone.
         Match the attributes in our label form in contact.handlebars
FINAL Code

    app.post('/send', (req, res) => {

    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;


    // YOU WILL INSERT SOME CODES HERE from https://nodemailer.com/about/




     });


20.  Go to https://nodemailer.com/about/

     Copy the code like below:
     Seems like different compared to this tutorial
     So I copied it from original Boiler Template.


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body


21.   Put the above code right under the output string Object.

      then, edit as per below

        YAHOO SMTP Settings
        Yahoo! SMTP server address: smtp.mail.yahoo.com
        Yahoo! SMTP user name: your Yahoo! Mail account
        Yahoo! SMTP password: your Yahoo! Mail password
        Yahoo! SMTP port: 465

LESS SECURE your YAHOO Mail

1. Login to your Email
2. Profile Picture>Account Info
3. Account Security
4. Enable this - Allow apps that use less secure sign-in
5. Then Click Manage app passwords, we will use this PW in this application.


        //COPIED FROM the ACTUAL BOILER PLATE just changed some values.

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: 'smtp.mail.yahoo.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
              user: 'valeroso.jayr@yahoo.com', // generated ethereal user
              pass: 'ewcjhqwqufgjicvb'  // your yahoo email app password.
          },
          tls:{        //If we are trying to use our localhost. We have to use tls and pass an object.
            rejectUnauthorized:false
          }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Nodemailer Contact" <valeroso.jayr@yahoo.com>', // sender address
            to: 'valeroso.jayr@gmail.com, rijeshp@byrnerental.com', // list of receivers, who will received your email.
            subject: 'Node Contact Request', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body we puttin output variable string we created.
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        //once the form has been submitted, we wanted to render the below
        //we are render the contact form with the message.
        //"contact" means our form contact.handlebars and the message.
        //remember the {{msg}} that we put in contact.handlebars?

            res.render('contact', {msg:'Email has been sent'});
        });


22.  Go to browse, localhost:3000
     Fill the Form
     submit

23. Check your email if you receive any email from the submitted form in localhost:3000
