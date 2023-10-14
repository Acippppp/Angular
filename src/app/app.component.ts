import { Component } from '@angular/core';
import { NationalityService } from './nationality.service';
import { forkJoin, map } from 'rxjs';

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
  filteredData: any = [];
  nationalityData: any[] = [];
  highestProbabilityCountry:any;

  headers = ["No", "Name", "Age"]
  headersq2 = ["Name", "Nationality"]


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
    const observables = this.filteredData.map((row: { Name: string; }) => {
      return this.getData(row.Name).pipe(
        map((highestProbabilityCountry) => ({
          ...row,
          country_id: highestProbabilityCountry.country_id,
          probability: highestProbabilityCountry.probability
        }))
      );
    });

    forkJoin(observables).subscribe(updatedItems => {
      this.filteredData = updatedItems;
      
    });
      

  }


  getData(name: string) {
    return this.natinality.getData(name).pipe(
      map((data: any) => {
        this.nationalityData = data["country"];
        // Find the country with the highest probability
        this.highestProbabilityCountry = this.nationalityData.reduce((max, current) => {
          return max.probability > current.probability ? max : current;
        });
        
        return this.highestProbabilityCountry;
      })
    );
  }
}


