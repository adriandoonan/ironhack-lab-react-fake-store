import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetailsPage() {
	// The state variable `product` is currently an empty object {},
	// but you should use it to store the response from the Fake Store API (the product details).
	const [product, setProduct] = useState({});

	// The `productId` coming from the URL parameter is available in the URL path.
	// You can access it with the `useParams` hook from react-router-dom.
	const { productId } = useParams();

	// To fetch the product details, set up an effect with the `useEffect` hook:
	const getProduct = async () => {
		try {
			const response = await fetch(
				`https://fakestoreapi.com/products/${productId}`,
			);
			const responseJson = await response.json();
			setProduct(responseJson);
			console.log(responseJson);
		} catch (err) {
			console.log("error fetching products list", error);
			return err;
		}
	};

	useEffect(() => {
		getProduct();
	}, []);

	if (!product) {
		return <h1>Loading ...</h1>;
	}

	return (
		<div className="flex flex-col items-start gap-4 p-16 ProductDetailsPage">
			{/* Render product details here */}
			<img className="w-96" src={product.image} alt={product.title} />
			<span className="px-2 py-1 text-white bg-blue-500 rounded-sm ">
				{product.category}
			</span>
			<h2 className="text-lg font-bold">{product.title}</h2>
			<section className="grid justify-start grid-cols-3">
				<p className="col-span-2 p-0 m-0 text-left">{product.description}</p>
				<p>{product.price}</p>
			</section>
			<Link to="/" className="self-center">
				<button
					type="button"
					className="mt-12 text-white bg-green-500 rounded-md"
				>
					Back
				</button>
			</Link>
		</div>
	);
}

export default ProductDetailsPage;
