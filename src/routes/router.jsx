import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { PostsPage } from "../pages/PostsPage";
import { CommentsPage } from "../pages/CommentsPage";
import { CreatePostPage } from "../pages/CreatePostPage";
import ErrorPage from "../pages/ErrorPage";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={'/posts'} replace /> },
      { path: 'posts', element: <PostsPage /> },
      { path: 'comments', element: <CommentsPage /> },
      { path: 'create-post', element: <CreatePostPage /> },
    ]
  },
]);

export default routes;