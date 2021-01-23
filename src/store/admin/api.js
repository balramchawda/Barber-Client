import { adminFetch as  fetch } from '../../utils'
const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

export const addServiceCategory = credentials => {
  console.log("credentials",credentials);
  return fetch(`${HOSTNAME}/admin/addCategory`, {
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
      return payload
    })
    .catch(error => {
      throw error
    })
}


export const getCustomerData = credentials => {
  console.log("credentials1",credentials);
    if(credentials.text!=""){
      console.log('enter')
      var credentials1={
          page:credentials.page,
          search_data:credentials.text
      }
    } else{
    var credentials1={
      page:credentials.page,
      // search_data:credentials.text
  }    
    } 
  return fetch(`${HOSTNAME}/admin/getAllUsers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials1)
    })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      // console.log(error);
      throw error
    })
}


export const getBarberDetails = credentials => {
  console.log("credentials",credentials);
  return fetch(`${HOSTNAME}/admin/getBarberDetailsById`, {
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
      return payload
    })
    .catch(error => {
      throw error
    })
}

export const getCustomerDetails = credentials => {
  console.log("credentials",credentials);
  return fetch(`${HOSTNAME}/admin/getCustomerDetailsById`, {
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
      return payload
    })
    .catch(error => {
      throw error
    })
}


export const updateUserStatus= credentials=>{
  // console.log('sss');
  return fetch(`${HOSTNAME}/admin/updateCustomerStatus`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials)
  })
  .then(res=>{
    return res.json()
  })
  .then(payload=>{
    return payload
  })
  .catch(error=>{
    throw error
  })
}

export const getBarberData = credentials => {
  console.log("credentials1",credentials);
    if(credentials.text!=""){
      console.log('enter')
      var credentials1={
          page:credentials.page,
          search_data:credentials.text
      }
    } else{
    var credentials1={
      page:credentials.page,
      // search_data:credentials.text
  }    
    } 
  return fetch(`${HOSTNAME}/admin/getAllBarbers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials1)
    })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      // console.log(error);
      throw error
    })
}

export const updateBarberStatus= credentials=>{
  console.log(credentials);
  return fetch(`${HOSTNAME}/admin/updateBarberStatus`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials)
  })
  .then(res=>{
    return res.json()
  })
  .then(payload=>{
    return payload
  })
  .catch(error=>{
    throw error
  })
}

export const getCategoryData= credentials=>{
  console.log("credentials",credentials);
   if(credentials.text!=""){
      console.log('enter')
      var credentials1={
          page:credentials.page,
          text:credentials.text
      }
    } else{
    var credentials1={
      page:credentials.page,
      // search_data:credentials.text
  }    
    } 
  return fetch(`${HOSTNAME}/admin/getAllCategoryAdminList`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials1)
  })
  .then(res=>{
    return res.json()
  })
  .then(payload=>{
    return payload
  })
  .catch(error=>{
    throw error
  })
}

export const updateCategoryStatus= credentials=>{
  console.log(credentials);
  return fetch(`${HOSTNAME}/admin/updateCategoryStatus`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials)
  })
  .then(res=>{
    return res.json()
  })
  .then(payload=>{
    return payload
  })
  .catch(error=>{
    throw error
  })
}


export const getPaymentHistory= credentials=>{
  console.log(credentials);
  if(credentials.text!=""){
      console.log('enter')
      var credentials1={
          page:credentials.page,
          text:credentials.text
      }
    } else{
    var credentials1={
      page:credentials.page,
      // search_data:credentials.text
  }    
    }
  return fetch(`${HOSTNAME}/admin/getPaymentHistory`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials1)
  })
  .then(res=>{
    return res.json()
  })
  .then(payload=>{
    return payload
  })
  .catch(error=>{
    throw error
  })
}

export const addSubscription = credentials => {
  console.log("credentials",credentials);
  return fetch(`${HOSTNAME}/admin/addSubscription`, {
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
      return payload
    })
    .catch(error => {
      throw error
    })
}

export const getSubscriptionData= credentials=>{
  console.log("credentials",credentials);
   if(credentials.text!=""){
      console.log('enter')
      var credentials1={
          page:credentials.page,
          text:credentials.text
      }
    } else{
    var credentials1={
      page:credentials.page,
      // search_data:credentials.text
  }    
    } 
  return fetch(`${HOSTNAME}/admin/getAllSubscriptionPlan`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials1)
  })
  .then(res=>{
    return res.json()
  })
  .then(payload=>{
    return payload
  })
  .catch(error=>{
    throw error
  })
}

export const updateSubscriptionStatus= credentials=>{
  console.log(credentials);
  return fetch(`${HOSTNAME}/admin/updateSubscriptionStatus`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials)
  })
  .then(res=>{
    return res.json()
  })
  .then(payload=>{
    return payload
  })
  .catch(error=>{
    throw error
  })
}

export const getSubscriptionDetails= credentials=>{
  console.log(credentials);
  return fetch(`${HOSTNAME}/admin/getSubscriptionById`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials)
  })
  .then(res=>{
    return res.json()
  })
  .then(payload=>{
    return payload
  })
  .catch(error=>{
    throw error
  })
}

export const updateSubscriptionDetails= credentials=>{
  console.log(credentials);
  return fetch(`${HOSTNAME}/admin/updateSubscriptionDetails`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(credentials)
  })
  .then(res=>{
    return res.json()
  })
  .then(payload=>{
    return payload
  })
  .catch(error=>{
    throw error
  })
}


