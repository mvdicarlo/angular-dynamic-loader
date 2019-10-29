import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  public count: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
