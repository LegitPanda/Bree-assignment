import { http } from "@google-cloud/functions-framework";
import { searchHits } from "./searchHits.mjs";
// import fs from "node:fs";

const APIKEY = process.env.API_KEY;
const OFAC_API = "https://api.ofac-api.com/v4/search";
const SOURCES = ["SDN", "NONSDN", "DPL", "FHFA", "SAM", "HUD", "SEMA", "LEIE"];

http("hits", async (req, res) => {
	const { name, year, country } = req.body;

	if (!name || !year || !country) {
		res
			.status(400)
			.send(
				"One or more missing required parameters: name, year, country",
			);
		return;
	}

	try {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				apiKey: APIKEY,
			},
			body: JSON.stringify({
				sources: SOURCES,
				types: ["person"],
				cases: [
					{ name: req.body.name, address: { country: req.body.country } },
				],
			}),
		};

		const response = await fetch(OFAC_API, options);

		if (!response.ok) {
			console.log(await response.text());

			res
				.status(response.status)
				.send("An error occurred while processing your request");
			return;
		}

		const ofacResult = await response.json();
		// fs.writeFile(
		// 	"response.json",
		// 	JSON.stringify(ofacResult, null, 4),
		// 	(err) => {
		// 		if (err) throw err;
		// 	},
		// );
		const hits = searchHits(req.body, ofacResult);
		res.json(hits);
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred while processing your request.");
	}
});
