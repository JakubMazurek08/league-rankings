import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Navbar} from "./pages/Navbar.tsx";
import {SkinSelectPage} from "./pages/SkinSelectPage.tsx";
import {RankSkinPage} from "./pages/RankSkinPage.tsx";

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
            element: <SkinSelectPage/>
        },
        {
            path: "/:championKey/:skinId",
            element: <RankSkinPage/>
        }
    ]
}])

export const Router = () => {
    return <RouterProvider router={router}></RouterProvider>;
}