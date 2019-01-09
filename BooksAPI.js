var default_query = 'harry pot'
const getBooksAPIURL = `https://www.googleapis.com/books/v1/volumes?q=`;
const getSelfBookAPIURL = `https://www.googleapis.com/books/v1/volumes?q=`;

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export const getBooks = (query='harry pot') => {
	return fetch(getBooksAPIURL+ (query==default_query || query==""? default_query: query), { headers })
	.then((res) => res.json())
	.then(data => data.items);
}

export const getSelfBookLink = (id) => {
	return fetch(getSelfBookAPIURL+id, { headers })
	.then((res) => res.json())
	.then(data => data.items);
}