import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Ticket } from '../../classes/ticket';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css'],
})
export class PublicoComponent implements OnInit {
  tickets: Ticket[] = [];
  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('container');
    this.escucharSockets();
  }

  escucharSockets() {
    this.wsService.listen('lista-tickets').subscribe((lista: Ticket[]) => {
      this.tickets = lista;
      console.log(this.tickets);
    });
  }
}
