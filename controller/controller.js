const { error } = require("console");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../env.js");
const { json } = require("body-parser");

/**send mail from testing account */
const signup = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

  let message = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Sucsessfully registed with us!!", // plain text body
    html: "Sucsessfully registed with us!!", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  //  res.status(201).json("user signup sucsessfully!!");
};

/**send mail from real gmail account */
const getbill = (req, res) => {
  const { userEmail } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: "Shringi",
      intro: "Your bill has arived",
      table: {
        data: [
          {
            item: "Nodemailer stock book",
            description: " A Beckend Application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forword to do more bussiness",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Place Order",
    html: mail,
  };

  transporter.sendMail(message).then(() => {
    return res
      .status(201)
      .json({
        msg: "You should recive an email",
      })
      .catch((error) => {
        return res.status(500), json({ error });
      });
  });

  // res.status(201).json("getbill sucsessfully!!");
};

module.exports = { signup, getbill };
