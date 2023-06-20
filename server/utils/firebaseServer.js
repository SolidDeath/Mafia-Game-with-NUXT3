import { initializeApp, cert, getApps } from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'

const firebaseServerConfig = {
    "type": "service_account",
    "project_id": "nuxt-auth-8cf00",
    "private_key_id": "598eb6122727756a6078b3149d91ec743e332aac",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsYeYcnBU7P2H+\n6ESeGAaYp/oaYfvMobdJgQfNeqCbO9gqDHQjg2c7g+CIj+IBYz1OWTT1f6ZzQZsA\nCUAKEQh/nroFUUXAiz3JUbutb9tnaIPZ45NRZNo3gzUj4u4AtO6TqpKCBe4h9cpn\n4i9Io4CAKd4tFWFe5ZiyhhFxWrMcahGRSBwAzxQax9j4mA2V5VqaL85/P/PdaW/n\nfCTESACk3gzU1xCe+EJPIri/echvsxaRyOYK9/XGmzm72ruwNi/T+9ZfrsWbkmwA\n+RgiCUftSQ+PW8zX/reuQyrJezZw2AMSVu1mQEouf9b1nvMzit8bzp7WaPHuESE7\nnMeAqzjRAgMBAAECggEAAIXGxUq6PxFEZ7+5WFhj3kZCuLVd2uVqpmdzOC9M+Dmu\nruchd2iYCJ9kXoGcVjPmNd7x1gG69GkPD1rjdcC3QunesA+ZFzQ7ZowYjX7fqf+Z\nE7nYvNr8Q5coYbrSBzlcdkm0GOGahDB/aQYYeWULlTw+KmTvdZ5PlYsNHWrML9D2\nLf/JLkzGXWKI9DOz4E+eLGNx7I65036zN3+XW3Obz+vGOqzRJq2a3CXPt+0ANfma\nrUGKhLTxE6FvOXeioWs2PSxp4HtX9ZllRZ+FONlwivJ4Z7DIsM/8lXezyh3T97vL\ncbDt+2bk6g2r9I3D7pUSOyctzeBuBXHtupEM9jHPaQKBgQDVykXaC48wvkwrvwrr\nCTsdDno8IQtb2/DPXOWSAz0UIJQkYea3nVdE8BTMsTKOYuWN/7tA4EHBGcEe+Yd9\nAdIxZVjCv5HxNR4KiDSAspOfOZyRqMRMbBPnJKJbaXYx9EqBR4TXhis1O4D2FB0Q\nYUJwbOgSIvJ+0Am0Tk/RAji5OQKBgQDOarr6lLzE8oK1ONKLJ5fpwGNNGrMF7EOR\nKNxQA/1VDrK0DI4zjm0eqmexnkVpJKF30tSb/RAgwXRkXPkFiK73emdT5Us/+zjR\nnIeVid8yYzWbZ1Yvzk7XZA1VU5j2WaDa//JETheS215WmL2/3//H71elp2ctTPrU\nD/OXOC10WQKBgBywv30KjhXRg/Fe+v0dyQQWPEszeA3Ez2VUpy5YJus7kAXt6YN8\npwiGW5Q4t3sqRHow9pU3QzvB1AvvGsKo6udcHXRNNy2ynix1qO4YiP0WQy+9AVLs\nMiOT5AH2fjkn+pOs4GP4CnZjXOQpQNlA5CSoSOCeNgLUsmizFb0L2kbpAoGBALxh\n1cFJKzpG5RlFAYm0GcVgKoA85LN8G3IIK4DvEy2kW11MtB7DVj0NYdNNUaWSo7Y6\neITgIO7z/yh1XWM6igwb7t83PUToHsPWKjtEd6mBt3PbjGHW1Edo7W44/DmgNNiJ\ni+3go00I3YEEpu/NG5+5hHEPZW+HeMc+w533zCwJAoGANrN6IvhSZBGp6XFRIcmd\ndJLxXtA5vt0cak9cIPC+aU2SQW6C0ivMIgIXjDK8xK8p2KIk2TfwfLl4wMtsLyaq\nzs4Yfi9xvJTV/5kyTAaYOgavJEtssQhn6VHMURL1Qzs7NvUYOVhT7qAJ98ydAbJP\nhk94wF3xzsIXuq2+vtC0Wdc=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-4f8vt@nuxt-auth-8cf00.iam.gserviceaccount.com",
    "client_id": "112173815271556388765",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4f8vt%40nuxt-auth-8cf00.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  

  export default function firebaseServer(){
    let app;
    if(getApps().length == 0){ //check if firebase app is already initialized
        app = initializeApp({
            credential: cert(firebaseServerConfig),
        })
      }
    const firestore = getFirestore(app);
    return {
      app, firestore
    }

  }