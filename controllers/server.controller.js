export const homecontrol = (req, res) => {
  res.render("index", {
    title: "Home Page",
  });
};

export const aboutcontrol = (req, res) => {
  res.render("about", {
    title: "About Page",
  });
};

export const contactcontrol = (req, res) => {
  res.render("contact", {
    title: "Contact Page",
  });
};
