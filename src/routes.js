import LatestArticles from "./components/latestarticles";
import About from "./pages/about";
import Contact from "./pages/contact";
import Details from "./pages/detailsblog";
import Gallery from "./pages/gallery";
import Home from "./pages/home";
import Idiopatik from "./pages/idiopatik";
import Kifoz from "./pages/kifoz";
import NotFound from "./pages/notFound";
import Serumlar from "./pages/serumlar";
import SerumlarDetails from "./pages/serumlardetails";
const routeItem = (id, title, path, component,element) => {
  return {
    id,
    title,
    path,
    component,
    element
  };
};

const routes = {
  home: routeItem(1, 'home', "/", Home),
  about: routeItem(2, 'about', "/about", About),
  notFound: routeItem(3, 'notFound', "*", NotFound),
 contact:routeItem(4,"contact","/contact",Contact),
 gallery:routeItem(5,"gallery","/gallery",Gallery),
 idiopatik:routeItem(6,"idiopatik","/randevu",Idiopatik),
 kifoz:routeItem(7,"kifoz","/hizmetlerimiz",Kifoz),
 detailsbloog:routeItem(8,"detailsblog","/details/:id",Details),
 serumlar:routeItem(9,"serumlar","/serumlar",Serumlar),
 serumlardetails:routeItem(10,"serumlardetails","/serumlar/:id",SerumlarDetails),

};

const routeArr = Object.values(routes);

export { routes, routeArr };
