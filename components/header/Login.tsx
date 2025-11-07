import { GiHamburgerMenu } from "react-icons/gi"

export default function Login() {
    return (
         <div className="flex items-center space-x-4">
            <button className="px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
            Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-700 transition-colors duration-200">
            <GiHamburgerMenu />
            </button>
        </div>
    )
}