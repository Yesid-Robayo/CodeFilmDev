// firebase/methods.js
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/fireBaseConfig";
import { coleccion } from "../utils/utilsTypes";

const FirestoreMethods = {
  addStorageFile: async (coleccion: coleccion, datos: any) => {
    try {
      const docRef = await addDoc(collection(db, coleccion), datos);
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error };
    }
  },
  getStorageFile: async (coleccion: coleccion, id: string) => {
    try {
      const docSnap = await getDoc(doc(collection(db, coleccion), id));
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      } else {
        return { success: false, error: "No se encontró el documento" };
      }
    } catch (error) {
      return { success: false, error: error };
    }
  },

  updateStorageFile: async (coleccion: coleccion, id: string, newData: any) => {
    try {
      const docRef = doc(collection(db, coleccion), id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, newData);
        return { success: true, message: "Documento actualizado exitosamente" };
      } else {
        return { success: false, error: "No se encontró el documento" };
      }
    } catch (error) {
      return { success: false, error: error };
    }
  },
  deleteStorageFile: async (coleccion: coleccion, id: string) => {
    try {
      const docRef = doc(collection(db, coleccion), id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await deleteDoc(docRef);
        return { success: true, message: "Documento eliminado exitosamente" };
      } else {
        return { success: false, error: "No se encontró el documento" };
      }
    } catch (error) {
      return { success: false, error: error };
    }
  },

  getAllStorage: async (coleccion: coleccion) => {
    try {
      const querySnapshot = await getDocs(collection(db, coleccion));
      const documents: any = [];
      querySnapshot.forEach((doc:any) => {
        documents.push({ id: doc.id, data: doc.data() });
      });
      return { success: true, data: documents };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  searchStorageFile: async (coleccion: coleccion, campo: string, valor: any) => {
    try {
      const q = query(collection(db, coleccion), where(campo, "==", valor));
      const querySnapshot = await getDocs(q);
      const results:any = [];
      querySnapshot.forEach((doc:any) => {
        results.push({ id: doc.id, data: doc.data() });
      });
      return { success: true, data: results };
    } catch (error) {
      return { success: false, error: error };
    }
  }
}

export default FirestoreMethods;
