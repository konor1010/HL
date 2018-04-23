import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  { AlertService } from 'app/components/alert/alert.service';

import { TournamentAnnouncementsService } from 'app/tournament-announcements/shared/tournament-announcements.service';
import { ListResponse } from 'app/shared/list/list-response';
import { TournamentAnnouncementListItem } from 'app/tournament-announcements/shared/tournament-announcement-list-item';
import {Organization} from 'app/tournament-announcements/shared/organization';
import { ArenaService} from 'app/arenas/shared/arena.service';
import { Arena} from 'app/arenas/shared/arena';

@Component({
  moduleId: module.id,
  selector: 'tao-list',
  inputs: ['content'],
  templateUrl: 'tao-list.component.html',
  styleUrls: ['tao-list.component.scss']
})

@Injectable()
export class TAOListComponent implements OnInit {
  content: TournamentAnnouncementListItem[];

  constructor( private service: TournamentAnnouncementsService,
               private arenaService: ArenaService,
               private router: Router,
               private alertService: AlertService ) {
  }

  ngOnInit() {
  }

  public viewTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem): void {
    this.router.navigate([ 'tournament-announcement', tournamentAnnouncement.id ]);
  }

  public editTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem): void {
    this.router.navigate([ 'tournament-announcements/edit', tournamentAnnouncement.id ]);
  }

  public addTournamentAnnouncement(): void {
    this.router.navigate([ 'tournament-announcements/create']);
  }

  public listTournaments(): void {
    this.router.navigate([ 'tournament-announcements']);
  }

  /*public draftToModerateTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem) {
    tournamentAnnouncement.state = 'WaitModeration';
    this.service.updateTournamentAnnouncement(tournamentAnnouncement);
  }*/

  public sendOnModeration(tournamentAnnouncement: TournamentAnnouncementListItem) {
    this.service.sendOnModeration(tournamentAnnouncement.id).subscribe(
      data => {
        //this.router.navigate(['/tournament-announcements']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось отправить на модерацию анонс турнира");
      },
      () => {} );
  }

  public deleteTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem) {
    this.service.deleteTournamentAnnouncement(tournamentAnnouncement.id).subscribe(
      data => {
        //this.router.navigate(['/tournament-announcements']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось удалить анонс турнира");
      },
      () => {} );
  }

  public closeTournamentAnnouncement(tournamentAnnouncement: TournamentAnnouncementListItem) {
    this.service.closeTournamentAnnouncement(tournamentAnnouncement.id).subscribe(
      data => {
        //this.router.navigate(['/tournament-announcements']);
      },
      error => {
        this.alertService.error(error);
        this.alertService.error("Не удалось завершить прием заявок");
      },
      () => {} );
  }
  public getTournamentAnnouncementLogo(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getTournamentAnnouncementLogo(tournamentAnnouncement);
  }

  public getRequiredResponseCount(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getRequiredResponseCountText(tournamentAnnouncement);
  }

  public getAgeGroupIconClass(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getAgeGroupIconClass(tournamentAnnouncement);
  }

  public getGenderIconClass(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getGenderIconClass(tournamentAnnouncement);
  }

  public getCostText(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getCostText(tournamentAnnouncement);
  }

  public getNoData(): string {
    return this.service.getNoData();
  }

  public getArenaLogo(arena: Arena): string {
    if (arena) {
      return this.arenaService.getArenaLogo(arena);
    }
    return '';
  }

  public getStateClass(tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getStateClass(tournamentAnnouncement);
  }

  // TODO вынести отдельный сервис для организаций (когда буду делать страницу для организации)
  public getOrganizationLogo(/*organization: Organization*/ tournamentAnnouncement: TournamentAnnouncementListItem): string {
    return this.service.getTournamentAnnouncementLogo(tournamentAnnouncement);
  }
}
