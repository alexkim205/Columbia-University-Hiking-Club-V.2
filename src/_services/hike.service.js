import * as config from '../_backend/config.json';
import { authHeader } from '../_helpers';

export const hikeService = {
  register,
  unregister,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function register (userid, hikeid) {

}

function unregister (userid, hikeid) {

}

function getAll () {

}

function getById (id) {

}

function create (hike) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(hike),
  };

  return fetch(`${config.apiUrl}/hikes/new`, requestOptions).then(handleResponse);
}

function update (hike) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(hike),
  };

  return fetch(`${config.apiUrl}/hikes/${hike.id}`, requestOptions).then(handleResponse);
}

function _delete (id) {

}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}