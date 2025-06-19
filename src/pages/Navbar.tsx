import { Outlet, Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <>
            <nav
                className={
                    "w-screen px-8 py-4"
                }
            >
               <Link to={'/'} className={"text-xl text-white font-bold font-spiegel"}>League-Rankings.com</Link>
            </nav>
            <main className="w-screen min-h-[calc(100vh-60px)] px-4 sm:px-8 md:px-16 lg:px-[200px] xl:px-[275px]">
                <Outlet />
            </main>
            <footer
                className={
                    "w-screen px-8 py-4"
                }
            >
                <Link to={'/'} className={"text-xl text-center text-white font-bold font-spiegel"}>League-Rankings.com</Link>
            </footer>
        </>
    );
};
