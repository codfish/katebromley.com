export function getBaseURL() {
  return process.env.NEXT_PUBLIC_BASE_API_URL;
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

  // if the endpoint starts with /api/ you know we're looking to hit
  // a local next.js api endpoint. Otherwise get the base api url from
  // the environment
  const baseApiUrl = endpoint.indexOf('/api/') === 0 ? '' : getBaseURL();
  const response = await fetch(`${baseApiUrl}${endpoint}`, config);
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
