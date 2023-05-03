import db from '@/firebase/init'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, addDoc } from 'firebase/firestore'

export const setDocument = async (collectionName: string, documentId: string, data: Record<string, any>) => {
  await setDoc(doc(db, collectionName, documentId), data)
}


export const updateDocument = async (collectionName: string, documentId: string, data: Record<string, any>) => {
  await updateDoc(doc(db, collectionName, documentId), data)
}

export const getDocument = async (collectionName: string, documentId: string) => {
  const docSnap = await getDoc(doc(db, collectionName, documentId))
  let result = null

  if (docSnap.exists()) {
    result = docSnap.data()
  } else {
    result = 'Document does not exist'
  }

  return result
}

export const getDocuments = async (collectionName: string) => {
  const querySnap = await getDocs(query(collection(db, collectionName)))
  const result: any[] = []
  querySnap.forEach((doc) => {
    result.push({...doc.data(), id: doc.id})
  })

  return result
}

export const deleteDocument = async (collectionName: string, documentId: string) => {
  await deleteDoc(doc(db, collectionName, documentId))
}
