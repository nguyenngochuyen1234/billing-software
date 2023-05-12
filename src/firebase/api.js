import db from './init'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, addDoc } from 'firebase/firestore'

export const setDocument = async (collectionName, documentId, data) => {
  await setDoc(doc(db, collectionName, documentId), data)
}
export const addDocument = async (collectionName, data) => {
  let result = await addDoc(collection(db, collectionName), data)
  return result.id
}


export const updateDocument = async (collectionName, documentId, data) => {
  await updateDoc(doc(db, collectionName, documentId), data)
}

export const getDocument = async (collectionName, documentId) => {
  const docSnap = await getDoc(doc(db, collectionName, documentId))
  let result = null
  
  if (docSnap.exists()) {
    result = docSnap.data()
  }

  return result
}

export const getDocuments = async (collectionName) => {
  const querySnap = await getDocs(query(collection(db, collectionName)))
  const result = []
  querySnap.forEach((doc) => {
    result.push({...doc.data(), id: doc.id})
  })

  return result
}

export const deleteDocument = async (collectionName, documentId) => {
  await deleteDoc(doc(db, collectionName, documentId))
}
