import test from "node:test";
import assert from "node:assert";
import { searchHits } from "../searchHits.mjs";
import response from "./responses/responseFawaz.json" with { type: "json" };

test("Abbas Loutfe FAWAZ search, match name, country and year", () => {
	const reqBody = {
		name: "Abbas Loutfe FAWAZ",
		year: "1978",
		country: "senegal",
	};
	const result = searchHits(reqBody, response);

	assert.equal(result.name, true);
	assert.equal(result.year, true);
	assert.equal(result.country, true);
});

test("Abbas Loutfe FAWAZ search, match name and country", () => {
	const reqBody = {
		name: "Abbas Loutfe FAWAZ",
		year: "1958",
		country: "senegal",
	};
	const result = searchHits(reqBody, response);

	assert.equal(result.name, true);
	assert.equal(result.year, false);
	assert.equal(result.country, true);
});

test("Abbas Loutfe FAWAZ search, match nationality lebanon", () => {
	const reqBody = { name: "ABBAS FOUAZ", year: "1958", country: "lebanon" };
	const result = searchHits(reqBody, response);

	assert.equal(result.name, true);
	assert.equal(result.year, false);
	assert.equal(result.country, true);
});

test("Abbas Loutfe FAWAZ search, match nationality lebanon & year", () => {
	const reqBody = { name: "ABBAS FOUAZ", year: "1978", country: "lebanon" };
	const result = searchHits(reqBody, response);

	assert.equal(result.name, true);
	assert.equal(result.year, true);
	assert.equal(result.country, true);
});



test("Abbas Loutfe FAWAZ search, match name but don't match year of the other result", () => {
	const reqBody = {
		name: "Abbas Loutfe FAWAZ",
		year: "1948",
		country: "canada",
	};
	const result = searchHits(reqBody, response);

	assert.equal(result.name, true);
	assert.equal(result.year, false);
	assert.equal(result.country, false);
});

test("Abbas Loutfe FAWAZ search, match alias", () => {
	const reqBody = {
		name: "ABBAS FOUAZ",
		year: "1958",
		country: "denmark",
	};
	const result = searchHits(reqBody, response);

	assert.equal(result.name, true);
	assert.equal(result.year, false);
	assert.equal(result.country, false);
});

test("Abbas Loutfe FAWAZ search, match nothing", () => {
	const reqBody = {
		name: "Abbas Loutfe FAWA",
		year: "1948",
		country: "canada",
	};
	const result = searchHits(reqBody, response);

	assert.equal(result.name, false);
	assert.equal(result.year, false);
	assert.equal(result.country, false);
});
