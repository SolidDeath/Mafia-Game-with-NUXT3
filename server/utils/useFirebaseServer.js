import { initializeApp, cert, getApps } from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'

const firebaseServerConfig = {
  "type": "service_account",
  "project_id": "nuxt-auth-8cf00",
  "private_key_id": "6633c23fb5d9f54ebb2d6008a3b05dca169f8efb",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1FISMv9yArQBF\nwfud2fRoZKPYmdy9m66hF69ukE4n3pdxpUgJl4su1OWNuUiIhKD5H8bk0/hMJc3C\nYNCNkY5pp+XbdjqERRgcb8BeJu7UAoM5DC355d5E0FxaVwzeIE2SPYE4TujnF47Q\n04ug1hMVRdcJRbxJBs8s6aYizbH2iBGZfPPhJtDGu4Q0YAFPqIzoILitFARhSgc+\nIwtNXIbskVTLXQpiGxZi6hp9BqWQuA5/Wjk3WeKtsseRomAenEqK0Sv9nooQP8++\nueTAs7EBdP121RwnGrzITm9DRxhNPE+XEBZNq7brLSjEXJCfTx/SQauUsdaCyyqd\n6ndRuGVjAgMBAAECggEABOk8+qsO6SWQjNPI6j9c3fOLeA4L9ZxgEoa+Bd2IIJP1\nEGZJ7qQh6IdIGd13vfimWatX3G4MO0XNeBrASg2Rl5VjDE0yeJ+O+J0iFmU4QMmv\ndRMQH3zGvmy0YMb+wS4F1il9mtzqWUjQDAEfLSoXk4l9VeUTuAocq9xlL96oOblj\nWTY80/nNgfHk0SR5m7Hh5CgJ336jnM5qSKcZYoIc023Lfb5YVF0BYeYYTuxnS1Lx\nS6VVn1Y+imn8UV6OP0/4GIIU062IBa11k2ctaZ0PxVLmqUcdG1cOzln5U+RY4Yxy\nKHCx1Pphf0msncQj4+5VpR0Z6YKPXAr+b/UNFfpToQKBgQDtBobEdbQciZ5Gy4kq\nCR6zZyQOKI8+doHN5C6vDQig5MtrDlrmErq6hD1p266YeDbIcWniCNNxBwGPLuv3\njwiEzTiFlDAmAYvN+LR8PL8NJ5LRZYOSDHN/+Xmnu8bE628aPZvmjnShy6+746ka\nea+hgSygbYHfdSMbguP0Mkd3IQKBgQDDk3o0f0a5ogZXEyrzYnAjSd9wRw9oldXU\nz2R9gtShbb8lSJShtsYX9cZtPeLc2h3Lqn9mAGSdcklMrkmssM6ReKr3IYYre2On\n2kwiIVzWPmeVISQk41FrR5PTaWX0CnztIYtTghj0l3Rzp9ccIP3ISFLNxsAS/Bd/\nCWSuWKIAAwKBgQC1Ixuy39C5TmJq7/ju6vFPYS8oss5lieNBGXSjym4hpzfdpKbK\n1N1m1NCqKXyQgK49GI82clBEPHpwlgc2tVRpSPw8+TailOPmkH49w56tyuRkqhOW\ndXV/A4R5LwOEUfgiMZsG4y82xpaSHDWLShtybWlRYN6ziq09xRW39QSwgQKBgG/E\nf0kzF2sM0ky+0oPm1KkGFaAnrAGb52jH4OjtdLCQdHVNJkvIlSqqNWzGujh2miKD\nXG0hel6UKpmc3NPI8zQlXqb+zJta15fcZDf5EwIJBc8u8mX2VthVPoDKMg6mU8B8\ntA/UQIi/aTiTSZZ0sDPeSRv6Ilh3IsJhztzoICSbAoGAXsjnEg01fJ7GAwGG+FCK\nAz8FoTBAt4JvbXbfLoFZWD/dOiOkeUgrtVVyyF/xsZ7n2saHEKI+dkR4YnPyt9/g\nikivzEg13ryQLDrhEKbVs/motJHaY0U2oPDdYSulZDKvLTXuL0ViRf6kkgjD58t8\nu7PoPoeF/aJ/cIFI7o3eR6Y=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-4f8vt@nuxt-auth-8cf00.iam.gserviceaccount.com",
  "client_id": "112173815271556388765",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4f8vt%40nuxt-auth-8cf00.iam.gserviceaccount.com",
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