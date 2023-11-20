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
