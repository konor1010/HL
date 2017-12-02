import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Point } from 'app/shared/map/point';

@Component({
  selector: 'map',
  inputs: ['points'],
  templateUrl: './map.component.html',
//   styleUrls: ['./pagination.component.scss'],
})
export class MapComponent implements OnInit {
    private _points: Point[];
    
    avg: Point;
    
    get points(): Point[]{ return this._points; }
    set points(value : Point[]){
        this._points = value;
        this.avg = this.getAveragePoint(value);
    }
    
    constructor() {
      }

    ngOnInit(): void {
    }

    private getAveragePoint(points : Point[]) : Point {
        if(points){
            let avg = new Point();
            let totalLat = 0, totalLong = 0;

            points.forEach((p:Point) => {
                totalLat += p.latitude;
                totalLong += p.longitude;
            });

            avg.latitude =  totalLat  / points.length
            avg.longitude = totalLong / points.length;

            return avg;
        }
        else 
            return null;
    }
}
