import { Outlet, useLocation } from "react-router-dom";
import { NavItem } from "../components/NavItem";

export const Layout = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    return (
        <div className="flex md:min-h-screen">
            <div className=" md:w-1/6 text-gray-700 bg-[#667eea] px-3 py-3">
                <div className="text-center mb">
                    <h1 className="text-white text-lg font-semibold tracking-widest   rounded-lg focus:outline-none focus:shadow-outline">CRM - Clientes</h1>
                </div>
                <nav>
                    <NavItem linkTo="/clientes" linkName="Clientes" urlActual={urlActual} />
                    <NavItem linkTo="/clientes/nuevo" linkName="Nuevo Cliente" urlActual={urlActual} />
                </nav>
            </div>
            <div className="md:w-5/6 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </div>
        </div>
    )
}
