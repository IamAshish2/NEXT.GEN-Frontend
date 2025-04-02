import axios from "axios"

export const userName = localStorage.getItem('userName');

const host = "localhost"
const port = 7172


export const base_url = `https://${host}:${port}/api/`

export const axios_no_auth = axios.create({
    baseURL:base_url,
    withCredentials: false,
    headers:{
        "Content-Type":"application/json",
    }
})

export const axios_auth = axios.create({
    baseURL:base_url,
    // for sending the cookie data to the server with each request
    withCredentials:true,
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

export const axios_auth_form = axios.create({
    baseURL: base_url,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

export const BusinessName = 'NEXT.GEN'
export const twitterUrl = "https://twitter.com"
export const facebookUrl = "https://facebook.com"
export const instagramUrl = "https://instagram.com"
export const whatsAppUrl = "https://whatsapp.com"