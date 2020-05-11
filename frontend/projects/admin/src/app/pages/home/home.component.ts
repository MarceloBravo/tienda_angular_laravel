import { Component, OnInit } from '@angular/core';
import { ScriptsService } from '../../services/scripts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private srcs: string[] = [
    "/assets/vendor/jquery/jquery.min.js",
    "/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
    "/assets/vendor/jquery-easing/jquery.easing.min.js",
    "/assets/js/ruang-admin.min.js",
    "/assets/vendor/chart.js/Chart.min.js",
    "/assets/js/demo/chart-area-demo.js"
  ];

  constructor(
    private _scriptsService: ScriptsService
  ) { 
    this._scriptsService.loadScripts(this.srcs);
  }

  ngOnInit() {
  }

}
