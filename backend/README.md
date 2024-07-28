# Intro
The backend is a simple one-endpoint API which calls an eternal SDN api to determine whether a combination of name, birth year and country appears in any US and Canadian SDN lists. It is currently using `api.ofac-api.com` for the source of its information.

# Examples
```bash
curl --request POST \
  --url https://hits-yhc2tubxbq-uc.a.run.app/ \
  --header 'Content-Type: application/json' \
  --data '{
	"name":"daniel TUITO",
	"country":"canada",
	"birthYear": "1959"
}'
```

Response:
```json
{
	"name": true,
	"year": true,
	"country": false
}
```



# Running
The backend is hosted on GCP as Google Cloud functions but they can be run locally with:

`npx functions-framework --target=hits`
If running locally, Make sure to change the APIKEY in `index.js`


# Testing

Unit tests can also be run with `node --test`
