import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onclickMenu() {
    $("#btnToggle").click()
  }

}
