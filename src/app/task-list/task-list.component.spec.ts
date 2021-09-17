import { HttpClientModule } from "@angular/common/http";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
  async,
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";
import { MaterialModule } from "../material/material.module";
import { ServiceDataService } from "../serviceData/service-data.service";
import { TaskListComponent } from "./task-list.component";

// Dammy task lisk for unit testing subscribe method
const mockTaskList = [
  {
    userId: Math.floor(Math.random() * 10) + 1,
    title: "task",
    completed: false,
  },
  {
    userId: Math.floor(Math.random() * 10) + 1,
    title: "task1",
    completed: false,
  },
  {
    userId: Math.floor(Math.random() * 10) + 1,
    title: "task2",
    completed: true,
  },
];

// test suit is created in which standard variable like component,fixture,mockList and testService
describe("TaskListComponent", () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  const mockList = mockTaskList;
  let testService: ServiceDataService;

  // configuration for testing components, modules and service is added
  beforeEach(() => {
    const serviceDataServiceStub = {
      addTask: data => ({ subscribe: f => f({ status: 330 }) }),
      getData: () => ({ subscribe: f => f({ data: mockTaskList }) }),
      deleteItem: id => ({ subscribe: f => f({ status: 200 }) }),

    }
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
          imports: [MaterialModule, FormsModule, HttpClientModule],
          declarations: [TaskListComponent],
          providers: [
            { provide: ServiceDataService, useValue: serviceDataServiceStub },
          ],
    });
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });


  // unit test case for component is created or not
  it("should create task-list component", () => {
    expect(component).toBeTruthy();
  });

  // unit test case to match title
  it("should match title", () => {
    expect(component.JsonData.TASK).toEqual("Task");
    expect(component.JsonData.LIST).toEqual("List");
  });

//unit test case for ngoninit
  it('makes call to ngOnInit ',inject([ServiceDataService], (serviceDataServiceStub) => {
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.whenStable().then(() => {
      component.ngOnInit();
      serviceDataServiceStub.getData().subscribe((result: any) => expect(result).toBeDefined());
      expect(component.ngOnInit()).toHaveBeenCalled();
    });
  }));

  //unit test case for subscribe method
  it('testing subscribe method is getting called', inject([ServiceDataService], (serviceDataServiceStub) => {
    spyOn(component, 'submit').and.callThrough();
    const data = 'task';
    const payload = {
      userId: (Math.floor(Math.random() * 10) + 1),
      title: data,
      completed: false,
    };
    fixture.whenStable().then(() => {
      component.submit(data);
      serviceDataServiceStub.addTask(payload).subscribe((result: any) => expect(result).toBeDefined());
      fixture.detectChanges();
      expect(component.submit).toHaveBeenCalled();
    });
  }));

  //unit test case for  delete mrethod
    it('makes call to delete ',inject([ServiceDataService], (serviceDataServiceStub) => {
    spyOn(component, 'delete').and.callThrough();
    fixture.whenStable().then(() => {
      component.delete(2,1);
      serviceDataServiceStub.deleteItem(2).subscribe((result: any) => expect(result).toBeDefined());
      expect(component.ngOnInit()).toHaveBeenCalled();
    });
  }));

});
