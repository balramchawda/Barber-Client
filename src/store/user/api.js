import { adminFetch as  fetch } from '../../utils'

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

export const loginUser = credentials => {
  // console.log(credentials);
  return fetch(`${HOSTNAME}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      console.log(payload);
      return payload
    })
    .catch(error => {
      throw error
    })
}

export const signupUser = data => {
  return fetch(`${HOSTNAME}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

export const getUser = data => {
  return fetch(`${HOSTNAME}/me`, {
    method: 'GET'
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

export const updateUser = data => {
  return fetch(`${HOSTNAME}/user/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

export const notifyUser = data => {
  return fetch(`${HOSTNAME}/user/notify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

export const forgotUser = data => {
  return fetch(`${HOSTNAME}/admin/forgotPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    return res.json()
  })
  .then(payload => {
    return payload
  })
  .catch(error => {
    throw error
  })
}

export const resetUser = data => {
  console.log("data",data);
  return fetch(`${HOSTNAME}/admin/updatePassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    return res.json()
  })
  .then(payload => {
    return payload
  })
  .catch(error => {
    throw error
  })
}
