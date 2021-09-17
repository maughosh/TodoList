import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { ServiceDataService } from "./service-data.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TaskDeatils } from "./taskDetails";
import { url } from "inspector";

describe("ServiceDataService", () => {
  // created variables
  let httpTestCntrl: HttpTestingController;
  let taskService: ServiceDataService;

  // configuration for testing module,services
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ServiceDataService],
    })
  );

  // creating the instances for Service and HttpTestingController
  beforeEach(() => {
    taskService = TestBed.get(ServiceDataService);
    httpTestCntrl = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    const service: ServiceDataService = TestBed.get(ServiceDataService);
    expect(service).toBeTruthy();
  });

  // for testing HttpClient.get
  it("should test HttpClient.get", () => {
    const tesGet: TaskDeatils[] = [
      { userId: 1, title: "task", completed: false },
      { userId: 3, title: "task1", completed: false },
      { userId: 5, title: "task2", completed: true },
    ];

    taskService.getData().subscribe((dataG) => {
      expect(dataG).toBe(tesGet, "should check mock data");
    });

    const req = httpTestCntrl.expectOne(taskService.url);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual("json");
    req.flush(tesGet);
  });

  // for testing HttpClient.post
  it("should test HttpClient.post", () => {
    const newData: TaskDeatils[] = [
      {
        userId: Math.floor(Math.random() * 10) + 1,
        title: "task",
        completed: false,
      },
    ];

    taskService.addTask(newData).subscribe((dataG) => {
      expect(dataG).toBe(newData);
    });

    const req = httpTestCntrl.expectOne(taskService.url);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual("json");
    req.flush(newData);
  });

  // for testing HttpClient.delete
  it("should test HttpClient.delete", () => {
    spyOn(taskService, "deleteItem").and.callThrough();
    taskService.deleteItem(2);
    expect(taskService.deleteItem).toHaveBeenCalled();
  });
});
