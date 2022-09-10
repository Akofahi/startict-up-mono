import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  deleteDoc,
  addDoc,
  collection,
  collectionData,
  Firestore,
  getDoc,
  doc,
  updateDoc,
  getDocs,
} from '@angular/fire/firestore';

import { getBlob, uploadBytes, } from '@angular/fire/storage';
import { map, Observable } from 'rxjs';
import { Categorys, Requests, Sector, Startup } from './model';

@Injectable()
export class FirebaseService {
  constructor(private afs: Firestore, private storage: AngularFireStorage
  ) { }

  private startupCollectiopnRef = collection(this.afs, 'startups');
  private requestCollectiopnRef = collection(this.afs, 'requests');
  private sectorCollectionRef = collection(this.afs, 'sectors');
  // private requestCollectiopnRef = collection(this.afs, 'requests');

  startups = collectionData(this.startupCollectiopnRef, { idField: 'id' });
  requests = collectionData(this.requestCollectiopnRef, { idField: 'id' });
  sectors = collectionData(this.sectorCollectionRef, { idField: 'id' });

  addStartup(startup: Startup) {
    return addDoc(this.startupCollectiopnRef, startup);
  }

  addSector(sector: Sector) {
    return addDoc(this.sectorCollectionRef, sector);
  }

  uploadImage(file: File) {
    let n = Date.now() + ".jpg";
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return task
      .snapshotChanges()
      .pipe(
        map(ref => {
          const url: Observable<string> = fileRef.getDownloadURL();
          return url
        }
        ))
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
  async getRequests(id: string) {
    const res = await getDoc(doc(this.afs, 'requests/' + id));
    console.log('get request', res.data(), 'get request id', res.id);
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

  async updateRequest(id: string, request: Partial<Requests>) {
    return await updateDoc(doc(this.afs, 'requests/' + id), request as any);
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

  async deleteRequest(id: string) {
    return await deleteDoc(doc(this.afs, 'requests/' + id));
  }

  addRequest(request: Requests) {
    return addDoc(this.requestCollectiopnRef, {
      ...request,
      status: 'pending',
    });
  }

  getSectors() {
    return getDocs(this.sectorCollectionRef).then((x) =>
      x.docs.map((x) => x.data())
    );
  }

  public categorysList = Object.keys(Categorys).filter((v) => isNaN(Number(v)));
}
