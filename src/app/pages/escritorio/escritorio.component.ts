import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { Ticket } from '../../classes/ticket';

@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.css'],
})
export class EscritorioComponent implements OnInit {
  numEscritorio: string;
  ticketAtendido: string;
  constructor(
    private router: ActivatedRoute,
    private wsService: WebsocketService
  ) {
    this.router.params.subscribe((params) => {
      this.numEscritorio = params['id'];
    });
  }

  ngOnInit(): void {
    this.wsService
      .findTicketEscritorio(this.numEscritorio)
      .subscribe((ticket: Ticket) => {
        if (ticket) {
          this.ticketAtendido = ticket.codigo + '';
        }
        console.log('ticket: ', ticket);
      });
  }

  atenderTikect() {
    this.wsService
      .atenderTicket(this.numEscritorio)
      .subscribe((ticket: Ticket) => {
        if (ticket) {
          this.ticketAtendido = ticket.codigo + '';
          // console.log('ticket: ', ticket);
        }
      });
  }
}
