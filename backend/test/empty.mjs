import test from "node:test";
import assert from "node:assert";
import { searchHits } from "../searchHits.mjs";
import response from "./responses/responseEmpty.json" with { type: "json" };

test("bill cosby search, match nothing with no results", () => {
	const reqBody = { name: "bill cosby", year: "1948", country: "canada" };
	const result = searchHits(reqBody, response);

	assert.equal(result.name, false);
	assert.equal(result.year, false);
	assert.equal(result.country, false);
});
