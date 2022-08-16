import { Injectable } from '@angular/core';
import {deleteDoc,updateDoc,  docData, addDoc, collection, collectionData, Firestore, getDocs, QuerySnapshot ,getDoc,doc} from '@angular/fire/firestore';
import { Startup } from './model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: Firestore) {


  }

  private startupCollectiopnRef = (collection(this.afs, 'startups'))
  private requestCollectiopnRef = (collection(this.afs, 'requests'))



  startups = collectionData(this.startupCollectiopnRef, {idField: 'id'})
  requests = collectionData(this.requestCollectiopnRef, {idField: 'id'})



  addStartup(startup: Startup) {
    addDoc(this.startupCollectiopnRef, startup)
  }

//  getStartup(id:string){
//   getDoc(doc(this.afs, 'startups/' + id )).then(res =>{
//     //  console.log("get startup" , res.data(),"get startup id",res.id)
//     return {
//       ...res.data(),
//       id: res.id,
//     }
//   })
//  }

async getStartup(id:string){
  const res = await getDoc(doc(this.afs,'startups/'+id))
  console.log("get startup" , res.data(),"get startup id",res.id)
  return {
          ...res.data(),
          id: res.id,
        }

}
  // todo get id to updatedoc
  updateStartup(startup : Startup){

  }

}

