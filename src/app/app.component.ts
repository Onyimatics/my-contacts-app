import { Component } from '@angular/core';
import {DialogService} from '@ngneat/dialog';
import {AddContactComponent} from './components/add-contact/add-contact.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-contacts-app';

  contacts = [
    {
      name: 'Onyinye Ezike',
      phone: '+2348164097565',
      email: 'blessing@gmail.com',
    },
    {
      name: 'Blessing Okoro',
      phone: '+2348074950871',
      email: 'blessing@gmail.com',
    },
    {
      name: 'Ben Kitho',
      phone: '+2347074950871',
      email: 'benkitho@gmail.com',
    },
    {
      name: 'Nkechi Ogbonna',
      phone: '+2348178374657',
      email: 'nkechi@gmail.com',
    },
    {
      name: 'John Doe',
      phone: '+2348138374900',
      email: 'johndoe@gmail.com',
    },
    {
      name: 'Julius Ngwu',
      phone: '+2348178374657',
      email: 'julius@gmail.com',
    },
    {
      name: 'Amaka Ezike',
      phone: '+2348178374657',
      email: 'amaka@gmail.com',
    },
    {
      name: 'Femi Femo',
      phone: '+2348178374657',
      email: 'femi@gmail.com',
    },
    {
      name: 'Johnson Gigg',
      phone: '+2348178374657',
      email: 'johnson@gmail.com',
    },
    {
      name: 'Everson Tom',
      phone: '+2348178374657',
      email: 'everson@gmail.com',
    },
    {
      name: 'Sarah Abbs',
      phone: '+2348178374657',
      email: 'sarah@gmail.com',
    },
  ];

  filteredContacts = [...this.contacts];

  constructor(private dialog: DialogService) {}

  searchContacts(term: string) {
    this.filteredContacts = this.contacts.filter((c) =>
      c.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  addContact() {
    this.dialog
      .open(AddContactComponent)
      .afterClosed$.pipe(filter((contact) => !!contact))
      .subscribe((newContact) => {
        this.contacts = [newContact, ...this.contacts];
        this.filteredContacts = [...this.contacts];
      });
  }

  deleteContact(contact: any) {

    this.dialog
      .confirm({
        title: 'Are you sure?',
        body: 'This action cannot be undone.'
      })
      .afterClosed$.subscribe(confirmed => {
       if (confirmed) {
         const index = this.contacts.findIndex((c) => c.name === contact.name);
         this.contacts.splice(index, 1);
         this.filteredContacts = [...this.contacts];
       } else {
         return;
       }
    });

  }
}
