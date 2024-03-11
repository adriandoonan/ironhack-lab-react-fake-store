import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductListPage() {
	// The state variable `products` is currently an empty array [],
	// but you should use it to store the response from the Fake Store API (the list of products).
	const [products, setProducts] = useState(null);

	// To fetch the list of products, set up an effect with the `useEffect` hook:

	const getAllProducts = async () => {
		try {
			const response = await fetch("https://fakestoreapi.com/products");
			const responseJson = await response.json();
			setProducts(responseJson);
		} catch (err) {
			console.log("error fetching products list", error);
			return err;
		}
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	if (!products) {
		return <h1>Loading ...</h1>;
	}
	return (
		<div className="p-4 ProductListPage">
			{products.map(({ id, title, image, category, price, description }) => (
				<Link
					to={`/product/details/${id}`}
					className="grid items-center grid-cols-5 gap-4 card"
					key={id}
				>
					<img alt={title} src={image} className="" />
					<strong className="">{title}</strong>
					<p className=""> {category}</p>
					<p className="">${price}</p>
					<p className="overflow-clip">{`${description.substring(
						0,
						50,
					)}...`}</p>
				</Link>
			))}
		</div>
	);
}

export default ProductListPage;
