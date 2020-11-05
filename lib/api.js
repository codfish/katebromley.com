export function getBaseURL() {
  return process.env.BASE_API_URL || 'http://localhost:1336';
}

/**
 * Simple wrapper around fetch, smaller alternative to axios.
 *
 * @see {@link https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper}
 *
 * @param {string} endpoint - URL to fetch.
 * @param {Object} options - Request options.
 * @returns {Object|Array} - Response data from fetch request.
 */
export async function fetchAPI(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'content-type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${getBaseURL()}/${endpoint.replace(/^\//, '')}`, config);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
}
