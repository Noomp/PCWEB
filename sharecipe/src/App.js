import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SiteHome from "./views/SiteHome";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import RecipePageDetails from "./views/RecipeDetailsPage";
import AddRecipePage from "./views/AddRecipePage";
import EditRecipePage from "./views/EditRecipePage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SiteHome /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp />},
    { path: "/recipe/:id", element: <RecipePageDetails />},
    { path: "/add", element: <AddRecipePage />},
    { path: "/edit/:id", element: <EditRecipePage />}
  ]);

  return (
    <RouterProvider router = {router} />
  );
}

export default App;
