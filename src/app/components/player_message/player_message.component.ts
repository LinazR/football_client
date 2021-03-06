import {Component, ElementRef, ViewChild} from '@angular/core';
import {PlayerMessageService} from './player_message.service';
import {GlobalParamsPlayerMessage} from './global-params-player-message';

@Component({
  selector: 'app-player-message',
  templateUrl: './player_message.component.html',
})
export class PlayerMessageComponent {
  @ViewChild('closeBtn3') closeBtn3: ElementRef;

  message = {
    name: {val: '', error: false},
    phone: {val: '', error: false},
    email: {val: '', error: false},
    text: {val: '', error: false},
    checked: {val: false, error: false}
  };

  constructor(private playerMessageService: PlayerMessageService,
              public globalParamsPlayerMessage: GlobalParamsPlayerMessage) {
  }

  sendMessage() {
    for (const i in this.message) {
      if (this.message.hasOwnProperty(i)) {
        this.message[i].error = this.message[i].val === '';
      }
    }

    for (const i in this.message) {
      if (this.message.hasOwnProperty(i) && this.message[i].error) {
        return false;
      }
    }

    this.playerMessageService.playerSendMessage().then(() => {
      this.globalParamsPlayerMessage.showMessage = false;
      this.closeBtn3.nativeElement.click();

    }, () => {
      console.log('Ошибка при регистрации');
    });
  }
}
