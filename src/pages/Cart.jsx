import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Cart = () => {
	const [cart, setCart] = useState(null);
	const [cartItems, setCartItems] = useState(null);

	// The `productId` coming from the URL parameter is available in the URL path.
	// You can access it with the `useParams` hook from react-router-dom.
	const { cartId } = useParams();

	// To fetch the product details, set up an effect with the `useEffect` hook:
	const getCart = async () => {
		try {
			const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
			const responseJson = await response.json();
			setCart(responseJson);
			//console.log(responseJson);
		} catch (err) {
			console.log("error fetching products list", error);
			return err;
		}
	};

	useEffect(() => {
		getCart();
	}, []);

	const getCartItems = async (items) => {
		const requests = Promise.all(
			items.map(async (item) => {
				const response = await fetch(
					`https://fakestoreapi.com/products/${item.productId}`,
				);
				const responseJson = await response.json();
				return responseJson;
			}),
		)
			.then((items) => {
				//console.log(items);
				setCartItems(items);
			})
			.catch((err) => {
				console.log("got an error fetching the products in the cart", err);
			});
	};

	useEffect(() => {
		cart && getCartItems(cart.products);
	}, [cart]);

	if (!cart || !cartItems) {
		return <h1>Loading ...</h1>;
	}

	const totalPrice = cart.products.reduce((acc, item) => {
		const { price } = cartItems.find(
			(product) => item.id === product.productId,
		);
		return acc + item.quantity * price;
	}, 0);

	console.log(cart);
	return (
		<div className="p-4">
			<h2 className="text-xl font-bold">Your Cart</h2>
			<p>You have {cartItems.length} items in your shopping cart</p>
			<p>
				Your total would be{" "}
				<span className="italic font-bold">${totalPrice}</span> plus shipping
			</p>
			{totalPrice < 20 && (
				<p>
					Spend ${(20 - totalPrice).toFixed(2)} more to qualify for free
					shipping!
				</p>
			)}
			<hr className="my-6" />
			{cart.products.map((product) => {
				const { title, category, price, image, description } = cartItems.find(
					(item) => item.id === product.productId,
				);
				// console.log("product", product);
				// console.log("prod", productDetails);
				return (
					<article
						className="grid items-center grid-cols-6 gap-4 m-4 card"
						key={product.productId}
					>
						<img alt={title} src={image} className="" />
						<strong className="">{title}</strong>
						<p className=""> {category}</p>
						<p className="">
							{product.quantity} @ ${price}
						</p>
						<p className="overflow-clip">{`${description.substring(
							0,
							50,
						)}...`}</p>
						<Link
							to={`/product/details/${product.productId}`}
							type="button"
							className="p-2 text-white bg-blue-500 rounded-md"
						>
							Details
						</Link>
					</article>
				);
			})}
		</div>
	);
};
export default Cart;
