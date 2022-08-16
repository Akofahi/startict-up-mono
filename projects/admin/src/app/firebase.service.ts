import { Injectable } from '@angular/core';
import {deleteDoc,updateDoc,  docData, addDoc, collection, collectionData, Firestore,getDocs, QuerySnapshot } from '@angular/fire/firestore';
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

  getStartups(){
    return getDocs<any>(this.startupCollectiopnRef)
  }

  // todo get id to updatedoc
  updateStartup(startup : Startup){

  }

}

