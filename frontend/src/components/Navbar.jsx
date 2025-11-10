import { LogOut, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    const { setTheme } = useThemeStore();

    return (
        <header
            className="border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
        >
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                        >
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">HiBro</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link> */}

                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className="btn m-1">
                                Themes
                            </div>
                            <ul
                                tabIndex="-1"
                                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                            >
                                <li>
                                    <button
                                        onClick={() => setTheme("lemonade")}
                                    >
                                        Lemonade
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setTheme("sunset")}>
                                        Sunset
                                    </button>
                                </li>
                                {/* <li>
                                    <button onClick={() => setTheme("night")}>
                                        Night
                                    </button>
                                </li> */}
                                <li>
                                    <button onClick={() => setTheme("cupcake")}>
                                        Cupcake
                                    </button>
                                </li>
                                {/* <li>
                                    <button onClick={() => setTheme("dim")}>
                                        Dim
                                    </button>
                                </li> */}
                            </ul>
                        </div>

                        {authUser && (
                            <>
                                <Link
                                    to={"/profile"}
                                    className={`btn btn-sm gap-2`}
                                >
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">
                                        Profile
                                    </span>
                                </Link>

                                <button
                                    className="flex gap-2 items-center cursor-pointer"
                                    onClick={logout}
                                >
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">
                                        Logout
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar;
