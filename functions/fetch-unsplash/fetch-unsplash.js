const handler = async (event) => {
  const { keyword, page } = event.queryStringParameters;

  const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${UNSPLASH_API_KEY}&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.results),
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

module.exports = { handler };
