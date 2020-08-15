import {Component} from '@angular/core';
import {CoachInfoService} from './coachInfo.service';
import {ActivatedRoute, Params} from '@angular/router';
import {GlobalParamsBreadcrumbs} from '../breadcrumbs/global-params-breadcrumbs';

@Component({
  selector: 'app-coach-info',
  templateUrl: './coachInfo.component.html',
})
export class CoachInfoComponent {
  coachInfo: InterFaceCoachInfo = {
    id: '',
    images: '',
    year: '',
    region: '',
    city: '',
    fio: '',
    birth_date: '',
    email: '',
    confirmation: '',
    phone: '',
    videosList: [],
    imagesList: [],
    awardsList: [],
    description: '',
    clubs: '',
    clubs_list: [{name: '', string: ''}],
    tournament: {list: [], listYear: []}
  };
  coachId: null;
  currentTournamentYear = '';
  showTournament = [];

  constructor(private coachInfoService: CoachInfoService,
              private router: ActivatedRoute,
              private globalParamsBreadcrumbs: GlobalParamsBreadcrumbs) {
    this.globalParamsBreadcrumbs.title = 'Информация о тренере';

    this.router.params.subscribe(
      (params: Params): void => {
        this.coachId = params.id;

        this.getCoach();
      }
    );
  }

  getCoach() {
    this.coachInfoService.getCoachInfo({id: this.coachId}).then((data: InterFaceCoachInfo) => {
        this.coachInfo = data;
        this.showTournament = data.tournament.list;
      },
      (error) => {
        console.log('Ошибка при получении детальной информации по футболисту: ', error);
      });
  }

  // выбор города для турнира
  changeTournament(data) {
    this.currentTournamentYear = data;
    if (data !== '') {
      this.showTournament = this.coachInfo.tournament.list.filter(item => item.year === data[0]);
    } else {
      this.showTournament = this.coachInfo.tournament.list;
    }
  }
}


