import { Link } from "react-router-dom"

export const NavItem = ({linkName, linkTo, urlActual}) => {
    return (
        <Link className={`${urlActual === linkTo ? 'text-gray-900 bg-[#5871e2]' : ''} block px-4 py-2 mt-2 text-sm font-semibold
        text-white bg-transparent rounded-lg
         hover:bg-[#5871e2]
        focus:outline-none focus:shadow-outline`}
        to={linkTo}>{linkName}</Link>
    )
}
