import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContactsStore} from '../../store/contacts.store';
import {Contact} from '../../models/contact.model';
import {DialogService} from '@ngneat/dialog';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  // @Input() data!: any[];
  //
  // @Output() deleteContact = new EventEmitter<{ name: string; phone: string }>();

  contacts$ = this.contactsStore.filteredContacts$;

  constructor(
    private contactsStore: ContactsStore,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
  }

  deleteContact(contact: Contact) {

    this.dialog
      .confirm({
        title: 'Are you sure?',
        body: 'This action cannot be undone.'
      })
      .afterClosed$.subscribe(confirmed => {
      if (confirmed) {
        this.contactsStore.deleteContact(contact);
      } else {
        return;
      }
    });
  }

}
