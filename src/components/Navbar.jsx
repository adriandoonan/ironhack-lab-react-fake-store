import logo from "./../assets/logo-ironhack-blue.png";
import cart from "./../assets/cart.png";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav className="fixed top-0 left-0 z-50 w-full text-white bg-blue-600 shadow-md">
			<div className="flex items-center justify-between h-20 px-4">
				<div className="flex items-center w-1/4 space-x-2">
					<Link to="/">
						<button className="flex items-center py-1 text-l">
							<img src={logo} alt="Logo" className="w-auto h-8" />
						</button>
					</Link>
				</div>

				<div className="flex justify-center w-1/2">
					<span className="text-xl">React Fake Store</span>
				</div>

				<div className="flex justify-end w-1/4 mr-4">
					{/* User Profile Button */}
					<Link to="/cart/5">
						<button type="button" className="flex items-center py-1 text-l">
							<img
								src={cart}
								alt="Cart icon"
								className="w-auto h-10 p-1 border border-white border-solid rounded-3xl"
							/>
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
