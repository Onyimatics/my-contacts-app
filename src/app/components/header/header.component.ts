import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ContactsStore} from '../../store/contacts.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @ViewChild('mainIcon') mainIcon!: ElementRef;

  // @Output() searchContacts = new EventEmitter<string>();
  // @Output() addContact = new EventEmitter<any>();

  search = false;

  constructor(
    private contactsStore: ContactsStore,
  ) { }

  ngOnInit(): void {
  }

  showSearch() {
    this.search = true;
  }

  hideSearch() {
    this.search = false;
  }

  searchContact(searchString: string) {
    this.contactsStore.patchState({ searchString })
  }

  addContact() {
    this.contactsStore.showAddDialog();
  }

}
