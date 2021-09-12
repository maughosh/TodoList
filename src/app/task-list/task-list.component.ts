import { Component, OnInit,ViewChild } from '@angular/core';
import { ServiceDataService } from '../serviceData/service-data.service';
import { taskDeatils } from '../serviceData/taskDetails';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
   TASK= "Task";
   LIST="List";
  @ViewChild('table', { static: true}) table
   ELEMENT_DATA:any = [  ];
  displayedColumns: string[] = [ 'name','action'];

  constructor(private commonSer:ServiceDataService) { 
    
  }

  ngOnInit() {
    this.commonSer.getData().subscribe(res=>{
      console.log(res)
    })
  }
  submit(data:any){
    console.log(data);
    this.commonSer.addTask().subscribe(res=>{
      data=res.name;
    })
    this.ELEMENT_DATA.push({name: data});
    this.table.renderRows() ;
    }

    delete(i:any){
      this.ELEMENT_DATA.splice(i,1);
      this.table.renderRows() ;
    }
}
