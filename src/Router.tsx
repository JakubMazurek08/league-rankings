import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Navbar} from "./pages/Navbar.tsx";
import {RankChampion} from "./pages/RankChampion.tsx";

const router = createBrowserRouter([{
    path: "/",
    element: <Navbar />,
    children: [
        {
            path: "",
            element: <Home/>
        },
        {
            path: "/:championKey",
            element: <RankChampion/>
        }
    ]
}])

export const Router = () => {
    return <RouterProvider router={router}></RouterProvider>;
}