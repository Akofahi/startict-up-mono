import { Injectable } from '@angular/core';
import {
  deleteDoc,
  addDoc,
  collection,
  collectionData,
  Firestore,
  getDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Sector, Startup } from './model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private afs: Firestore) {}

  private startupCollectiopnRef = collection(this.afs, 'startups');
  private requestCollectiopnRef = collection(this.afs, 'requests');
  private sectorCollectionRef = collection(this.afs, 'sectors');

  startups = collectionData(this.startupCollectiopnRef, { idField: 'id' });
  requests = collectionData(this.requestCollectiopnRef, { idField: 'id' });
  sectors = collectionData(this.sectorCollectionRef, { idField: 'id' });

  addStartup(startup: Startup) {
    return addDoc(this.startupCollectiopnRef, startup);
  }

  addSector(sector: Sector) {
    return addDoc(this.sectorCollectionRef, sector);
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

  async getStartup(id: string) {
    const res = await getDoc(doc(this.afs, 'startups/' + id));
    console.log('get startup', res.data(), 'get startup id', res.id);
    return {
      ...res.data(),
      id: res.id,
    };
  }
  async getSector(id: string) {
    const res = await getDoc(doc(this.afs, 'sectors/' + id));
    return {
      ...res.data(),
      id: res.id,
    };
  }
  // todo get id to updatedoc
  async updateStartup(id: string, startup: Startup) {
    return await updateDoc(doc(this.afs, 'startups/' + id), startup as any);
  }

  async updateSector(id: string, sector: Sector) {
    return await updateDoc(doc(this.afs, 'sectors/' + id), sector as any);
  }

  async deleteStartup(id: string) {
    return await deleteDoc(doc(this.afs, 'startups/' + id));
  }

  async deleteSector(id: string) {
    return await deleteDoc(doc(this.afs, 'sectors/' + id));
  }
}
