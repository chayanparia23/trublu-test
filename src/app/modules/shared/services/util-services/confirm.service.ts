import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  confirmModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  confirm(title = "Confirmation", 
    message = "Are you sure you want to do this?", 
    btnOkText = "Ok",
    btnCancelText="Cancel"): Observable<boolean> {
      const config = {
        class: "modal-dialog-centered",
        initialState: {
          title,
          message,
          btnOkText,
          btnCancelText
        }
    }

    this.confirmModalRef = this.modalService.show(ConfirmDialogComponent, config);

    return new Observable<boolean>(this.getResult());
  }

  private getResult() {
    return (observer) => {
      const subscription = this.confirmModalRef.onHidden.subscribe(() => {
        observer.next(this.confirmModalRef.content.result);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }
}
