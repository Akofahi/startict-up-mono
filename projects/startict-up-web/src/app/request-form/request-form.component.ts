import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'projects/libs/src/firebase.service';
import { Categorys, Sector } from 'projects/libs/src/model';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.less']
})
export class RequestFormComponent implements OnInit {
  sectorsData! : Sector[];
  requestForm!:FormGroup;
  categorySelected: any;
  filteredSectors: Sector[]=[];
   categorysList = Object.keys(Categorys).filter(v => isNaN(Number(v)));

  constructor(    
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit(): void {
   this.firebaseService.getSectors().then((res)=>{
    console.log(res);
    
   })

   

    this.firebaseService.sectors.subscribe((res) =>{
      this.sectorsData = res as any
    })
    this.requestForm = this.fb.group({
      startupName: [null, [Validators.required]],
      logoImg: [null, [Validators.required]],
      images : [null,[Validators.required]],
      designColor : [null,[Validators.required]],
      city : [null,[Validators.required]],
      founderName : [null,[Validators.required]],
      numberOfEmployees : [null,[Validators.required]],
      yearOfEstablishment : [null,[Validators.required]],
      websiteURL : [null,[Validators.required]],
      email : [null,[Validators.required]],
      categorys:[null,[Validators.required]],
      sectors : [null,[Validators.required]],
    })

  }

  
  add(): void {
    if (this.requestForm.valid) {
      this.firebaseService.addRequest(this.requestForm.value).then(() => {
        
      });
    } else {
      Object.values(this.requestForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  updateSectorsCat(){
    const category = this.requestForm.get('categorys')?.value
    this.filteredSectors = this.sectorsData.filter(v=>v.category==category)
  }
}
