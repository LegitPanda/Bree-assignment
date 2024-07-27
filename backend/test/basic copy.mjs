import test from "node:test";
import assert from "node:assert";
import { searchHits } from "../searchHits.mjs";
import response from "./responses/responseMatches.json" with { type: "json" };

test("Abu Abbas search, match name and year", () => {
	const reqBody = { name: "Abu Abbas", birthYear: "1948", country: "canada" };
	const result = searchHits(reqBody, response);

	assert.equal(result.name, true);
	assert.equal(result.year, true);
	assert.equal(result.country, false);
});

test("Abu Abbas search, match name but don't match year of the other result", () => {
	const reqBody = { name: "Abu Abbas", birthYear: "1978", country: "canada" };
	const result = searchHits(reqBody, response);

	assert.equal(result.name, true);
	assert.equal(result.year, false);
	assert.equal(result.country, false);
});

test("Abu Abbas search, match nothing", () => {
	const reqBody = { name: "Abu Abba", birthYear: "1978", country: "canada" };
	const result = searchHits(reqBody, response);

	assert.equal(result.name, false);
	assert.equal(result.year, false);
	assert.equal(result.country, false);
});
