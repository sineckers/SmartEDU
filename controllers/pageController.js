const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
    res.status(200).render('index', {
      page_name: 'index',
    });
  };

  exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
      page_name: 'contact',
    });
  };
  
  exports.sendEmail = async (req, res) => {
  
    const outputMessage = `
    
    <h1>Mail Details </h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `
  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "arinyazilim@gmail.com",
        pass: "bpwrtssmqdsdjdjw",
      },
    });
  
    let info = await transporter.sendMail({
      from: '"Smart EDU Contact Form" <arinyazilim@gmail.com>',
      to: "yasar.ylmz.yt@gmail.com",
      subject: "Smart EDU Contact Form New Message ✔",
      html: outputMessage
    });
  
    console.log("Message sent: %s", info.messageId);
    
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
    res.status(200).redirect('contact');
  
  };
  
  exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
      page_name: 'about',
    });
  };

  exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
      page_name: 'register',
    });
  };

  exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
      page_name: 'login',
    });
  };