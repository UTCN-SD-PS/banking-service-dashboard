import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/client.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { ClientInterface } from 'src/app/shared/models/interfaces/client';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  /** Flag for letting know the user that something is loading/happening */
  isProcessing: boolean;

  constructor(public clientModel: ClientModel, private apiService: ApiService) {}

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients(reloadClients: boolean = false) {
    if (!reloadClients) {
      /** Initialize the loading process */
      this.isProcessing = true;
      /** Clear the Client Model values (if it was instantiated before) */
      this.clientModel.clear();
    }
    this.apiService.getClients().subscribe(
      /** On Success: save the list of clients in the client model */
      (data: Array<ClientInterface>) => (this.clientModel.all = data),
      /** On Error: log the error and end the loading process */
      (error: HttpErrorResponse) => {
        console.error(error);
        this.isProcessing = false;
      },
      /** End the loading process no matter what
       * at the end of all operations */
      () => (this.isProcessing = false)
    );
  }

  onClientIdSelected(clientId: string) {
    this.clientModel.selectedClientId = clientId;
  }
}
