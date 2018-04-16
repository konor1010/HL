import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import {of} from 'rxjs/observable/of';

import { TournamentAnnouncementListItem } from 'app/tournament-announcements/shared/tournament-announcement-list-item';
import { TournamentAnnouncementFilter } from 'app/tournament-announcements/shared/tournament-announcement-filter';
import { TournamentAnnouncementViewItem } from 'app/tournament-announcements/shared/tournament-announcement-view-item';
import { AuthenticationService } from 'app/core/auth/authentication.service';
import { ListResponse } from 'app/shared/list/list-response';
import { ListInfo } from 'app/shared/list/list-info';
import { ApiConfig } from 'app/core/api-config';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class TournamentAnnouncementsService {
  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthenticationService,
    private readonly apiConfig: ApiConfig) {
  }

  public getTournamentAnnouncements(filter: TournamentAnnouncementFilter, listInfo: ListInfo): Observable<ListResponse<TournamentAnnouncementListItem>> {
    const methodUrlPrefix = '/tournament-announcements' + '/list';

    console.log(filter.cityId);
    const methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = listInfo.toParams();

    if (filter.cityId)
      params = params.append('cityId', filter.cityId.toString());
    if (filter.startDateFrom)
      params = params.append('startDateFrom', filter.startDateFrom);
    if (filter.startDateTo)
      params = params.append('startDateTo', filter.startDateTo);
    if (filter.state)
      params = params.append('state', filter.state);
    if (filter.ageGroup)
      params = params.append('ageGroup', filter.ageGroup);
    if (filter.gender)
      params = params.append('gender', filter.gender);
    if (filter.isCommercial)
      params = params.append('isCommercial', filter.isCommercial.toString());
    if (filter.searchText)
      params = params.append('searchText', filter.searchText);

    console.log(filter);

    return this.httpClient.get<ListResponse<TournamentAnnouncementListItem>>(methodUrl, { params: params });
  }

  public getTournamentAnnouncementsAdmin(filter: TournamentAnnouncementFilter, listInfo: ListInfo): Observable<ListResponse<TournamentAnnouncementListItem>> {
    const methodUrlPrefix = '/tournament-announcements' + '/tournament-admin-list';

    console.log(filter.cityId);
    const methodUrl = this.getMethodUrl(methodUrlPrefix);
    let params = listInfo.toParams();

    if (filter.cityId)
      params = params.append('cityId', filter.cityId.toString());
    if (filter.startDateFrom)
      params = params.append('startDateFrom', filter.startDateFrom);
    if (filter.startDateTo)
      params = params.append('startDateTo', filter.startDateTo);
    if (filter.state)
      params = params.append('state', filter.state);
    if (filter.ageGroup)
      params = params.append('ageGroup', filter.ageGroup);
    if (filter.gender)
      params = params.append('gender', filter.gender);
    if (filter.isCommercial)
      params = params.append('isCommercial', filter.isCommercial.toString());
    if (filter.searchText)
      params = params.append('searchText', filter.searchText);
    // console.log(filter);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + currentUser.token
      });
      return this.httpClient.get<ListResponse<TournamentAnnouncementListItem>>(methodUrl, {
        params: params,
        headers: headers
      });
    }
  }

  public getTournamentAnnouncementLogo(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem ): string {
    const logoSrc = this.apiConfig.filesPath;
    const placeholder = "assets/img/arenas/no_logo.png"; // TODO
    return tournamentAnnouncement.logo ? logoSrc + tournamentAnnouncement.logo : placeholder;
  }

  public getTournamentAnnouncement(id: number): Observable<TournamentAnnouncementViewItem> {
    const methodUrlPrefix = '/tournament-announcements/' + id;
    let methodUrl = this.getMethodUrl(methodUrlPrefix);
    return this.httpClient.get<TournamentAnnouncementViewItem>(methodUrl);
  }

  public getRequiredResponseCountText(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem) {
    return tournamentAnnouncement.requiredResponseCount ? tournamentAnnouncement.requiredResponseCount + ' чел.' : this.getNoData();
  }

  public getAgeGroupIconClass(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem) {
    return tournamentAnnouncement.ageGroup === 'Children' ? 'fa fa-child' : 'fa fa-male';
  }

  public getGenderIconClass(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem) {
    return tournamentAnnouncement.gender === 'Female' ? 'fa fa-female' : 'fa fa-male';
  }

  public getStateClass(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem) {
    let stateClass = '';
    switch(tournamentAnnouncement.state) {
      case 'Draft': {
        stateClass = 'table-active';
        break;
      }
      case 'WaitModeration': {
        stateClass = 'table-warning';
        break;
      }
      case 'ApprovedByModerator': {
        stateClass = 'table-success';
        break;
      }
      case 'RejectedByModerator': {
        stateClass = 'table-danger';
        break;
      }
      case 'Canceled': {
        //statements;
        break;
      }
      case 'Deleted': {
        //statements;
        break;
      }
      case 'Finished': {
        //statements;
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    return stateClass;
  }

  public getCostText(tournamentAnnouncement: TournamentAnnouncementListItem | TournamentAnnouncementViewItem) {
    if (tournamentAnnouncement.isCommercial) {
      if (tournamentAnnouncement.cost) {
        return tournamentAnnouncement.costType === 'PerTeam' ? tournamentAnnouncement.cost + '/команда' : tournamentAnnouncement.cost + '/чел.';
      }
      else {
        return this.getNoData();
      }
    }
    return 'бесплатно';
  }
  private getMethodUrl(methodUrlPrefix: string): string {
    return this.apiConfig.apiPath + methodUrlPrefix;
  }

  public getNoData() {
    return 'не определено';
  }
}
