import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { ArenaService } from 'app/arenas/shared/arena.service';
import { ArenaFilter } from 'app/arenas/shared/arena-filter';
import { ArenaType } from 'app/arenas/shared/arena-type';
import { City } from 'app/core/geo/city';
import {TournamentAnnouncementFilter} from 'app/tournament-announcements/shared/tournament-announcement-filter';

@Component({
  moduleId: module.id,
  selector: 'tournament-announcement-filter',
  templateUrl: 'tournament-announcement-filter.component.html'
})

@Injectable()
export class TournamentAnnouncementFilterComponent implements OnInit {

  @Input() filter: TournamentAnnouncementFilter;
  @Output() onFiltered = new EventEmitter<boolean>();

  // arenaTypes: ArenaType[];
  errorMessage: string;
  toggled: boolean;

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;
   city: City;

  constructor( private service: TournamentAnnouncementFilter) {
    const filterState = JSON.parse(localStorage.getItem('tournamentAnnouncementFilterFilterState'));
    // TODO проверка существования поля toggled
    this.toggled = filterState && filterState.toggled;
    console.log(this.toggled);
  }

  ngOnInit() {
    // this.getArenaTypes();
     this.city = new City;
  }

  // private getArenaTypes() {
  //   this.service.getArenaTypes()
  //   .subscribe(
  //     arenaTypes => {
  //       let emptyValue : ArenaType = { id: null, name: "Выберите тип арены" };
  //       this.arenaTypes = new Array<ArenaType>();
  //       this.arenaTypes.push(emptyValue);
  //       this.arenaTypes =  this.arenaTypes.concat(arenaTypes);
  //     },
  //     error => this.errorMessage = error
  //   );
  // }

  public toggle() {

    this.toggled = !this.toggled;
    console.log(this.toggled);
    localStorage.setItem('tournamentAnnouncementFilterFilterState', JSON.stringify({toggled: this.toggled}));
  }

  // private setCity(city: City) {
  //   if (city && city.id) {
  //     this.city = city;
  //   }
  // }
  //
  search() {
    if (this.city && this.city.id) {
      this.filter.cityId = this.city.id;
    }
    this.onFiltered.emit();
  }
}
