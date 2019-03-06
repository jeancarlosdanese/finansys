import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-messages',
  templateUrl: './server-error-messages.component.html',
  styleUrls: ['./server-error-messages.component.scss']
})
export class ServerErrorMessagesComponent implements OnInit {

  @Input('server-error-title') serverErrorTitle: string = 'Error no servidor';
  @Input('server-error-messages') serverErrorMessages: string[] = null;

  constructor() { }

  ngOnInit() {
  }

}
