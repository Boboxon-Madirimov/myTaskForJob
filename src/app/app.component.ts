import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  iconClass: string = 'bi bi-arrow-up'; // Default icon class
  sortOrder: string = 'asc'; // Default sorting order

  selectedPage: number = 1; // Default page number
  data: any;
  totalPages: number = 1; // Total number of pages
  pageSize: number = 10; // Default page size
  pages: number[] = []; // Array to hold page numbers
  last: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchData(); // Fetch data on component initialization
  }
  toggleIcon() {
    if (this.iconClass === 'bi bi-arrow-up') {
      this.iconClass = 'bi bi-arrow-down';
      this.sortProductsDesc();
    } else {
      this.iconClass = 'bi bi-arrow-up';
      this.sortProductsAsc();
    }
  }
  fetchData(page: number = 1) {
    this.apiService.fetchData('all', page, this.pageSize) // Change 'all' to your desired ordering
      .subscribe((response) => {
        this.data = response;
        // Update total pages based on total items and page size
        this.totalPages = Math.ceil(this.data.total / this.pageSize);
        // Generate array of page numbers, limited to 5
        let start = Math.max(1, page - 2);
        let end = Math.min(this.totalPages, start + 4);
        this.pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      });
  }

  prevPage() {
    if (this.selectedPage > 1) {
      this.selectedPage--;
      this.fetchData(this.selectedPage);
    }
  }

  nextPage() {
    if (this.selectedPage < this.totalPages) {
      this.selectedPage++;
      this.fetchData(this.selectedPage);
    }
  }
  public sortProductsDesc() {
    this.data.data = this.data.data.sort((a: any, b: any) => a.id - b.id);
  }

  public sortProductsAsc() {
    this.data.data = this.data.data.sort((a: any, b: any) => b.id - a.id);
  }
}