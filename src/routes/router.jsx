import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
]);

export default routes;