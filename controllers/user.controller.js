import { User } from "../server.js";

export const userHome = (req, res) => {
  res.render("userhome", { title: "User Home Page" });
};

export const userGetRegister = (req, res) => {
  res.render("userregister", { title: "Register Page" });
};

export const userPostRegister = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/user/login");
};

export const userGetLogin = (req, res) => {
  res.render("userlogin", { title: "Login Page" });
};

export const userPostLogin = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.redirect("/user/register");

  const isPasswordMatch = user.password === password;

  if (!isPasswordMatch)
    return res.render("userlogin", {
      title: "Login Page",
      msg: "Wrong Password. Try again",
    });

  return res.render("index", {
    title: "Home Page",
    msg: `Hello, ${user.name}`,
  });
};
