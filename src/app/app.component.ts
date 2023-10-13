import { Component } from '@angular/core';
import { NationalityService } from './nationality.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private natinality: NationalityService) {

  }
  title = 'Angular-question';
  displayTable: boolean = false;
  filteredData:any = []
  nationalityData:any = {}

  headers = ["No", "Name", "Age"]
  headersq2 = ["Name","Nationality"]


  data: any = [
    {
      No: "1",
      Name: "Alex",
      Age: 23
    },
    {
      No: "2",
      Name: "Mia",
      Age: 30
    },
    {
      No: "3",
      Name: "Zayn",
      Age: 28
    },
    {
      No: "4",
      Name: "Nathaniel",
      Age: 41
    },
    {
      No: "5",
      Name: "Susan",
      Age: 32
    }
  ]
   



  showTable() {
    this.displayTable = true;
    this.filteredData = this.data.filter((item: { Age: number; }) => item.Age > 30);
    this.filteredData = this.filteredData.map((row: { Name: string; }) =>({
      ...row,
      nationalityData:this.getData(row.Name),
    }));

  }

  getData(name: string) {
    this.natinality.getData(name).subscribe(data => {
      console.log(data);

    })
  }

}
