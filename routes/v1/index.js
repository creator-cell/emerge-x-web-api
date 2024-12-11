const express = require("express");
const blogRoute = require("./blog.route");
const newsRoute = require("./news.route");
const demoRequestRoute = require("./demoRequest.route");
const contactRoute = require("./contact.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/news",
    route: newsRoute,
  },
  {
    path: "/contact",
    route: contactRoute,
  },
  {
    path: "/demoRequest",
    route: demoRequestRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
