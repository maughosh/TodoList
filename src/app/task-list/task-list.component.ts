import { Component, OnInit, ViewChild } from "@angular/core";
import { ServiceDataService } from "../serviceData/service-data.service";
import labelList from "../../assets/labelList.json";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
  // taking json data from assets folder to component
  JsonData: any = labelList;

  @ViewChild("taskForm", { static: true }) taskForm: NgForm;

  ELEMENT_DATA: any = [];
  inputField = "";

  // Initializing the ServiceDataService
  constructor(private commonSer: ServiceDataService) {}

  // Subscribing data from the api so that we can use the data in application
  ngOnInit() {
    this.fetchData();
  }

  //fetches data from API
  fetchData() {
    this.commonSer.getData().subscribe((res) => {
      this.ELEMENT_DATA = res;
    });
  }
  // submit()  is used in the + button . we are doing 2 task in this method
  submit(data: any) {
    // Whatever the data we put in input box we are sending that as a body in api using payload()
    const payload = {
      userId: Math.floor(Math.random() * 10) + 1,
      title: data,
      completed: false,
    };

    this.commonSer.addTask(payload).subscribe((res) => {
      this.ELEMENT_DATA = [res, ...this.ELEMENT_DATA];
    });
    this.inputField = "";
  }

  // Delete() is used for delete button
  delete(i: number, id: number) {
    // We are using splice() to delete data from an array
    this.ELEMENT_DATA.splice(i, 1);

    // Here Deleting data from api
    this.commonSer.deleteItem(id).subscribe((res) => {});
  }
}
