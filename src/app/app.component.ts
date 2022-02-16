import { Component, OnInit } from '@angular/core';
import { tabs } from './mock/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const jsonData = JSON.stringify(tabs);
    localStorage.setItem('tabs', jsonData);
    console.log('get', JSON.parse(localStorage.getItem('tabs')));
  }
}
