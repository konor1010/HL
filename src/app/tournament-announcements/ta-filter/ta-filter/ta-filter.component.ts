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
import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { City } from 'app/core/geo/city';
import {TournamentAnnouncementFilter} from 'app/tournament-announcements/shared/tournament-announcement-filter';

@Component({
  //moduleId: module.id,
  selector: 'ta-filter',
  templateUrl: 'ta-filter.component.html'
})

@Injectable()
export class TournamentAnnouncementFilterComponent implements OnInit {

  @Input() filter: TournamentAnnouncementFilter;
  @Output() onFiltered = new EventEmitter<TournamentAnnouncementFilter>();

  errorMessage: string;
  toggled: boolean;
  state: string;

  searching = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchFailed = false;
  city: City;

  constructor( private service: TournamentAnnouncementsService) {

  }

  ngOnInit() {
    const filterState = JSON.parse(localStorage.getItem('tournamentAnnouncementFilterFilterState'));
    // TODO проверка существования поля toggled
    this.toggled = filterState && filterState.toggled;

    const filter = JSON.parse(localStorage.getItem('tournamentAnnouncementFilter'));
    const filterCity = JSON.parse(localStorage.getItem('tournamentAnnouncementFilterCity'));
    if (filter) {
      this.filter = filter;
      if (filterCity) {
        this.setCity(filterCity);
        if (this.city && this.city.id) {
          this.filter.cityId = this.city.id;
        }
      }
      this.onFiltered.emit(this.filter);
    } else {
      this.filter = new TournamentAnnouncementFilter();
      this.city = new City();
    }
  }
  public toggle() {
    this.toggled = !this.toggled;
    localStorage.setItem('tournamentAnnouncementFilterFilterState', JSON.stringify({toggled: this.toggled}));
  }

  search() {
    if (this.city && this.city.id) {
      this.filter.cityId = this.city.id;
    }
    localStorage.setItem('tournamentAnnouncementFilter', JSON.stringify(this.filter));
    localStorage.setItem('tournamentAnnouncementFilterCity', JSON.stringify(this.city));
    this.onFiltered.emit(this.filter);
  }

  reset() {
    this.filter = new TournamentAnnouncementFilter();
    this.city = new City();
  }

  public getToggleIcon() {
    if (this.toggled) {
      return 'fa fa-angle-down';
    } else {
      return 'fa fa-angle-up';
    }
  }

  private setCity(city: City) {
    if (city) {
      this.city = city;
    }
  }

  /* TODO перенести в общий сервис отсюда и из остальных фильтров */
  public getToggleTitle(toggled: boolean): string {
    if (toggled) {
      return 'Развернуть';
    } else {
      return 'Свернуть';
    }
  }

  public onChangedStartDt(dt: Date) {
    this.filter.startDateFrom = dt.toISOString();
  }

  public onChangedEndDt(dt: Date) {
    this.filter.startDateTo = dt.toISOString();
  }

}
