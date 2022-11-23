import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.less'
import { App } from './app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as firebase from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import initializeApp = firebase.initializeApp

export const queryClient = new QueryClient()

const firebaseConfig = {
  apiKey: 'AIzaSyAL41xtH8-C-2qad1kes5x3AwgHeg6cuxQ',
  authDomain: 'todolistreactquery.firebaseapp.com',
  databaseURL: 'https://todolistreactquery-default-rtdb.firebaseio.com',
  projectId: 'todolistreactquery',
  storageBucket: 'todolistreactquery.appspot.com',
  messagingSenderId: '904272548239',
  appId: '1:904272548239:web:2af0d7ef8adfc449c57bfa',
  measurementId: 'G-QMHJDQM0VJ'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)


const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  </React.StrictMode>
)