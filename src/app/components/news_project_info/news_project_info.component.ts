import {Component} from '@angular/core';
import {NewsService} from '../news_mini/news.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-news-project-info',
  templateUrl: './news_project_info.html',
})
export class NewsProjectInfoComponent {
  newsProject: InterFaceNewsInfo = {
    id: null,
    title: '',
    img: '',
    date_create: '',
    text: ''
  };

  news: InterFaceNewsMini[] = [];

  newsId = null;

  constructor(private newsService: NewsService,
              private router: ActivatedRoute) {
    this.router.params.subscribe(
      (params: Params): void => {
        this.newsId = params.id;
      }
    );

    this.getNewsInfo();
    this.getNews();
  }

  getNewsInfo() {
    this.newsService.getNewsProjectInfo({id: this.newsId}).then((data: InterFaceNewsInfo) => {
        this.newsProject = data;
      },
      (error) => {
        console.log('Ошибка при получении списка новостей проекта: ', error);
      });
  }

  getNews() {
    this.newsService.getNews().then((data: InterFaceNewsMini[]) => {
        this.news = data;
      },
      (error) => {
        console.log('Ошибка при получении списка новостей: ', error);
      });
  }
}


