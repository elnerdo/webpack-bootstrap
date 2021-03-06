import 'babel-polyfill';
import 'isomorphic-fetch';
const BACKEND_URL = 'http://localhost:3000';

export function fetchJSON(path) {
  const url = `${BACKEND_URL}${path}`;

  return fetch(url)
    .then(response => reponse.json())
    .catch( ex => {
      console.error('parsing failed', ex);
    });
}


export function sendJSON(method, path, payload) {
  const url = `${BACKEND_URL}${path}`;

  return fetch(url, {
    method: method,
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .catch(ex => {
      console.error('parsing failed', ex)
    })
}
