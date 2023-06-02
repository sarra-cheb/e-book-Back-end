const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../Models/UserModel');
const emailcompte = process.env.EMAIL
const passwordcompte = process.env.PASSWORD
exports.register = async (req, res) => {
  try {
    const found = await User.findOne({ email: req.body.email })
    if (found) {
      res.status(400).json({ message: 'User already exists' })
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt)
      req.body.password = hash
      if (req.body.role === 'client') {
        await User.create({ ...req.body, typeofclient: 'normal' });
        res.json({ message: 'Client user registered successfully' });
      } else {
        await User.create(req.body);
        res.json({ message: 'User admin registered successfully' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error server' })
  }
}

exports.login = async (req, res) => {
  try {
    const found = await User.findOne({ email: req.body.email })

    if (found) {
      const valid = bcrypt.compareSync(req.body.password, found.password)
      if (valid) {
        const data = {
          userName: found.name,
          userEmail: found.email,
          userID: found._id
        }
        const userRole = found.role
        const token = jwt.sign(data, process.env.JWTSECRET, { expiresIn: "1d" });
        res.status(200).send({ message: 'connected successfully', token, userRole })
      }
      else {
        res.status(400).send({ message: 'verify password' })
      }
    }
    else {
      res.status(400).send({ message: 'verify email and password' })
    }
  } catch (error) {

    res.status(500).send({ message: 'erreur serveur' || error })
  }
}
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const User = await User.findOne({ email });
    if (!User) {
      return res.status(400).send({ message: 'User not found' });
    } else {
      const token = jwt.sign({ userId: User._id }, process.env.JWTSECRET, { expiresIn: '15m' });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailcompte,
          pass: passwordcompte,
        },
      });

      const mailOptions = {
        from: emailcompte,
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `
        <p>Bonjour , pour renitialisez votre mot de passe SVP Cliquez sur le lien ci-dessous :</p>
        <a  href="http://localhost:3000/demo8/auth-reset">Réinitialiser votre mot de passe</a>
        <p> vous avez besoin d utiliser cet code : </p>
       
        <hr>
        <p style='color:red;'>
        ${token} 
        </p>
        <hr>
       
        <p>Au revoir et merci pour votre confiance </p>
      `,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).send({ message: 'Password reset link sent to your email' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { Code } = req.body

  try {

    const decoded = jwt.verify(Code, process.env.JWTSECRET)
    const userfound = await User.findById(decoded.userId)
    if (!userfound) {
      return res.status(404).send({ message: 'User not found' });
    }

    await User.findByIdAndUpdate(userfound._id, { password: newPassword })
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailcompte,
        pass: passwordcompte,
      },
    });

    const mailOptions = {
      from: emailcompte,
      to: userfound.email,
      subject: 'succés de renitialisation',
      html: `
      <p>Bonjour , vous avez renitialisez votre mot de passe avec succes 
      
      Au revoir et merci pour votre confiance </p>
    `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Password reset successfully' });
  } catch (error) {

    res.status(400).send({ message: 'Invalid token' });
  }
}