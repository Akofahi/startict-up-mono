import { Injectable } from '@angular/core';
import { doc, docData, addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Startup } from './model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: Firestore) {


  }

  private startupCollectiopnRef = (collection(this.afs, 'startups'))
  private requestCollectiopnRef = (collection(this.afs, 'requests'))



  startups = collectionData(this.startupCollectiopnRef)
  requests = collectionData(this.requestCollectiopnRef)


  
  addStartup(startup: Startup) {
    addDoc(this.startupCollectiopnRef, startup)
  }
}
