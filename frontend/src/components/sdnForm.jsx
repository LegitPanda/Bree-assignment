import { COUNTRIES } from "../consts";
import { Checkmark } from "./checkmark";
import { createSignal } from "solid-js";
import "./sdn.css";

const fetchHits = async (name, year, country) => {
	const response = await fetch("https://hits-yhc2tubxbq-uc.a.run.app", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, year, country }),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	return response.json();
	// return {
	// 	name: true,
	// 	year: true,
	// 	country: false,
	// };
};

export default function SDNLookup() {
	const [hits, setHits] = createSignal({
		name: undefined,
		year: undefined,
		country: undefined,
	});

	const [isLoading, setIsLoading] = createSignal(false);
	const [error, setError] = createSignal("");

	const submit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const form = e.target;
		const name = form.querySelector("#name").value;
		const year = form.querySelector("#year").value;
		const country = form.querySelector("#country").value;

		try {
			const hits = await fetchHits(name, year, country);
			setHits(hits);
			setError("");
		} catch (error) {
			console.error("Error fetching data:", error);
			setError(error.toString());
		} finally {
			setIsLoading(false);
		}
	};

	const resetHits = () => {
		setHits({ name: undefined, year: undefined, country: undefined });
	};

	return (
		<main>
			<h1>SDN Lookup</h1>
			<div>{error()}</div>
			<form class="form" onSubmit={submit}>
				<div>
					<label for="name">Name:</label>
					<span class="container">
						<input
							type="text"
							id="name"
							name="name"
							required
							onChange={resetHits}
						/>
						<Checkmark value={hits().name} />
					</span>
				</div>
				<div>
					<label for="country">Country:</label>
					<span class="container">
						<select id="country" name="country" required onChange={resetHits}>
							<option value="">Select Country (Type to filter)</option>
							{COUNTRIES.map((country) => (
								<option value={country}>{country}</option>
							))}
						</select>
						<Checkmark value={hits().country} />
					</span>
				</div>
				<div>
					<label for="year">Year:</label>
					<span class="container">
						<input
							type="number"
							id="year"
							name="year"
							required
							onChange={resetHits}
						/>
						<Checkmark value={hits().year} />
					</span>
				</div>
				<button type="submit" disabled={isLoading()}>
					Submit
				</button>
			</form>
		</main>
	);
}
