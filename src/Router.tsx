import {createBrowserRouter, RouterProvider, useLocation} from "react-router-dom";
import {useEffect} from "react";

import {Home} from "./pages/Home.tsx";
import {Navbar} from "./pages/Navbar.tsx";
import {SkinSelectPage} from "./pages/SkinSelectPage.tsx";
import {RankSkinPage} from "./pages/RankSkinPage.tsx";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null
}

const router = createBrowserRouter([{
    path: "/",
    element: <>
        <ScrollToTop/>
        <Navbar/>
    </>,
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