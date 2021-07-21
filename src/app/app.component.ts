import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;

  // crete audio obj
  audioObj = new Audio();

  // create audio event
  audioEvent = [
    'ended',
    'error',
    'play',
    'playng',
    'pause',
    'timeupdate',
    'canplay',
    'loadmetadata',
    'loadstart',
  ];

  files = [
    {
      url: './assets/song1.mp3',
      name: 'Aaye Ho Meri Zindagi Mein',
    },
    {
      url: './assets/song2.mp3',
      name: 'Agar Tum Mil Jao',
    },
    {
      url: './assets/song3.mp3',
      name: 'Ajeeb Dastaan Hai Yeh',
    },
    {
      url: './assets/song4.mp3',
      name: 'Bol Do Na Zara',
    },
    {
      url: './assets/song5.mp3',
      name: 'Pani Pani Song',
    },
  ];

  streamObserver(url) {
    return new Observable((observer) => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
      };
      this.addEvent(this.audioObj, this.audioEvent, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;

        this.removeEvent(this.audioObj, this.audioEvent, handler);
      };
    });
  }

  addEvent(obj, events, handler) {
    events.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj, events, handler) {
    events.forEach((event) => {
      obj.removeEventListener(event, handler);
    });
  }

  setSeekTo(ev) {
    this.audioObj.currentTime = ev.target.value;
  }

  setVolume(ev) {
    this.audioObj.volume = ev.target.value;
  }

  openFile(url) {
    this.streamObserver(url).subscribe((event) => {});
  }

  play() {
    this.audioObj.play();
  }
  pause() {
    this.audioObj.pause();
  }
  stop() {
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }
  timeFormat(time, format = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}
