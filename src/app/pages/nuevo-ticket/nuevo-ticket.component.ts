import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Ticket } from '../../classes/ticket';

@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  styleUrls: ['./nuevo-ticket.component.css'],
})
export class NuevoTicketComponent implements OnInit {
  nombreTicket = '';
  constructor(public wsService: WebsocketService) {}

  ngOnInit(): void {
    this.wsService.getUltimoTickets().subscribe((data: Ticket) => {
      if (!data) {
        this.nombreTicket = 'No existe tickets';
      } else {
        this.nombreTicket = `Ticket ${data.codigo}`;
      }
    });
    this.escucharSockets();
  }

  escucharSockets() {
    // Agregar ticket
    this.wsService.listen('agregar-ticket').subscribe((ticket: Ticket) => {
      this.nombreTicket = `Ticket ${ticket.codigo}`;
      console.log(ticket);
    });
  }

  generarTicket() {
    this.wsService.emit('agregar-ticket');
  }
}
