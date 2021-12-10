import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MedicalTool } from 'src/app/Models/medicalTool';
import { Location } from '@angular/common';


import { MedicalToolsService } from 'src/app/Services/medical-tools.service';

@Component({
  selector: 'app-medical-tools',
  templateUrl: './medical-tools.component.html',
  styleUrls: ['./medical-tools.component.css']
})
export class MedicalToolsComponent implements OnInit {

  medicals:MedicalTool[]=[];

 
  constructor(private httpClient:HttpClient,
    private medicalToolService:MedicalToolsService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private location:Location
    
    
    ) { }
 
  ngOnInit(): void {
    this.getAll()
    
  }

  getAll(){
    this.medicalToolService.getMedicalTools().subscribe(
      response=>{
        this.medicals=response
      }
    )
  }
  delete(medicalToolID:number){
    this.medicalToolService.delete(medicalToolID).subscribe(
      response=>{
        this.toastrService.success("Medical Tool Successfully Deleted");
        this.router.navigateByUrl("/refresh",{skipLocationChange:true}).then(()=>{
          this.router.navigate([decodeURI(this.location.path())])
        })

       
        
      }
        
    )
   
  }
 
 
 

}
