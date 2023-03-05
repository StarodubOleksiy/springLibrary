
import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-non-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  appUrl = environment.angularUrl;

  constructor() { }

  ngOnInit() {
  }

}