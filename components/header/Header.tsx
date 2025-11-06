import Logo from "./Logo"
import Navlinks from "./NavLinks"
import Login from "./Login"

export default function Header() {
    return (      
             <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                       <Logo />
                       <Navlinks />
                       <Login />
                    </div>
                </div>
            </header>        
    )
}