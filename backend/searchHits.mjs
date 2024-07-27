const PERSON = "Person";

export const searchHits = (search, response) => {
	const searchFormatted = {
		name: search.name.trim().toLowerCase(),
		year: search.year.trim(),
		country: search.country.trim().toLowerCase(),
	};

	const hits = { name: false, year: false, country: false };

	// since we're not batching, there should only be one result item in the array
	// also sanity check to look for type="Person", since the structure is dependant type
	const personMatches = response.results?.[0].matches?.filter(
		(match) =>
			match.type === PERSON &&
			(nameMatches(match.name, match.nameFormatted, searchFormatted.name) ||
				match.alias?.some(
					(al) => al.name.trim().toLowerCase() === searchFormatted.name,
				)),
	);

	if (!personMatches) {
		return hits;
	}

	hits.name = personMatches.length > 0;

	hits.year = personMatches.some((match) =>
		match.personDetails.birthDates.some((birthDates) =>
			birthDates.includes(search.year),
		),
	);

	hits.country = personMatches.some(
		(match) =>
			match.addresses?.some((address) =>
				trimLower(address?.country).includes(searchFormatted.country),
			) ||
			match.identifications?.some((id) =>
				trimLower(id?.country).includes(searchFormatted.country),
			) ||
			match.personDetails?.citizenships?.some((citizenship) =>
				trimLower(citizenship).includes(searchFormatted.country),
			) ||
			match.personDetails?.nationalities?.some((nationality) =>
				trimLower(nationality).includes(searchFormatted.country),
			),
	);

	return hits;
};

const trimLower = (str) => {
	if (!str) {
		return "";
	}
	return str.trim().toLowerCase();
};

const nameMatches = (name, formattedName, search) => {
	const formattedSearch = search.trim().toLowerCase();
	return (
		name.trim().toLowerCase() === formattedSearch ||
		formattedName === formattedSearch
	);
};
