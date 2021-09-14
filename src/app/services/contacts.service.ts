import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Contact} from '../models/contact.model';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts = [
    {
      name: 'Onyinye Ezike',
      phone: '+2348164097565',
    },
    {
      name: 'Blessing Okoro',
      phone: '+2348074950871',
    },
    {
      name: 'Ben Kitho',
      phone: '+2347074950871',
    },
    {
      name: 'Nkechi Ogbonna',
      phone: '+2348178374657',
    },
    {
      name: 'John Doe',
      phone: '+2348138374900',
    },
    {
      name: 'Julius Ngwu',
      phone: '+2348178374657',
    },
    {
      name: 'Amaka Ezike',
      phone: '+2348178374657',
    },
    {
      name: 'Femi Femo',
      phone: '+2348178374657',
    },
    {
      name: 'Johnson Gigg',
      phone: '+2348178374657',
    },
    {
      name: 'Everson Tom',
      phone: '+2348178374657',
    },
    {
      name: 'Sarah Abbs',
      phone: '+2348178374657',
    },
  ];

  constructor() { }

  fetchContacts(): Observable<Contact[]> {
    return of(this.contacts).pipe(delay(1000));
  }

  addContact(newContact: Contact): Observable<Contact> {
    this.contacts.unshift(newContact);
    return of(newContact).pipe(delay(1000));
  }

  deleteContact(contact: Contact): Observable<any> {
    const index = this.contacts.findIndex((c) => c.name === contact.name);
    this.contacts.splice(index, 1);
    return of({success: true}).pipe(delay(1000));

  }
}
