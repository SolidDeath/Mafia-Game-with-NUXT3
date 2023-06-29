import { initializeApp, cert, getApps } from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'

const firebaseServerConfig = {
  "type": "service_account",
  "project_id": "mafia-tool",
  "private_key_id": "dbe8a0b9c776c5dcde2e2aa0da32b059a56be061",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHn1zAtoKVzXKu\ngIQzCwp7OEiwf2uqe/EAEibjkRzoYAeXkIZZKy6b3Xw6N7rppDZBGwp63CQEzFbh\nc+qjA5BDnShq+mkLQ2L7uq/hzss4sUDSPPhMGAlHzH0cj+dp1UnS/Y6umrBFb78Z\nma3zFr0b4Wun9pajoy4aWAnYVJX7GmMjqexP5l4LAi++ieg3UHdeptjrlNibGJhK\nibyMQvg7LPqJ2O/JnkCnUQHgSpuW0+nqItb4XHy7nrMUhxoEJkWl2YJONONM1ArV\nIAet+dgkMZRH6+G5R3zh+fNA6h4pRtJ5lZPKbM5v5kb6KTkrch59aQB4VoFSO9ay\nYvTbzBWxAgMBAAECggEABFuMmCnbxaahmGDWkfEtokU3JAAyEtuIBiT/S5QvPfzb\nqZG2dxOX3b/q3m/5QPCsXQU4uDgeQqsNwffocTTKlUlE2Ln86UmoK1/Wx05+9e67\noCND1dBoAnTardEP34nwBb6yesoGa0ueT7Igv5fZWraT5aueu/V71AgkNeBZ0kyG\nImqgoG3hlbkPEPSOIa+9JI5A7G0owTPi77ZRgHsI3WhZ16qbEctZ1HCBwFFK8SsQ\nMXpbj4MZCjFPurKJUHlqEQDWc9hPw3iNrqqvrdkpkvY1yxNmKEX884nT81lW/4P8\nYt8RZwqA8glXgue9wegPw7uf860kDIsA7uMdJPTXiQKBgQD1oYvyqIMzgKleotk+\nwn0sft18fYIU+EAViPRIG1QE0GB4uWe9TZxm09Y0c1kPpXmu9PDQm/DYYsRua/wQ\nCBSzcYWY+W3Nk9Sfb942nLwfvVlJw5O64JTYIJ+/yRbxI/wFeCL+hLkTSHnPEJ7T\nk8XvOZqFW7YDqHqZvS8NwIPPCQKBgQDQDJ3d6FeZd2ArOcaFq1YsyAzqaUWS69n8\nChPACSPbKI0pTTJpxfJ7/FpEkNYIUKN3DYXDXskV5sIrbQT8hG1FobOKuispWxXk\n5yuzOPM0XU9gaJ5YVokiJQplAOkDCivWwt7cj7vrjQMEj9KdqiLWeprvSAEDNgOh\nUcwWg4qTaQKBgQDsHWw/yIjGO0mUNQqL770Pxqv1/VfL/I7tpIbdwZdUQVJa+i6k\npDRSDBP+u1rDVZfQ/Jd4kE5GUzrrwlW8u2fazqdT04EfepmK4ahD6wpToFpyM9SQ\ncU3jLAkj/JNXHfYm88L/0mluBd9BkoJ6c7RzL3Y/91bR0WR44IiYuZR6sQKBgQCX\nDPH5UV14gOGDwLjQB+vTK5OlBbWLzE1B3pckT/6GedSzbebyQNOjDT8ElRuwgcuM\n/nZluIXKrvW+zbJXHFaxvYs7Z5s6tXUZ8nUZ9HkvRagB2TNN89Ywwi/f0V9b46Cc\nlnN0M68+f+z2/Ozvp70Pd4jRvbdue2L7VwYUOoD8MQKBgDFJtvt4LpMnGYNEOXVw\nqOkL5i63AxwxfcgX7fmxmyapXTT28GffLBubCK1w3YGhluyB+kFMCOV54KwH+0rW\n1A4zYLyMMC6hJTBIXpGpln9yU5WoFv5cUqCTIXY8Nm4P0kkGVbfVkNCOuareWFfq\nO64b1o2vsfI+gaEKiDLInWLF\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-k7pau@mafia-tool.iam.gserviceaccount.com",
  "client_id": "112785021190465859399",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k7pau%40mafia-tool.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

  

  export default function useFirebaseServer(){
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