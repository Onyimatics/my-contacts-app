import {Contact} from '../models/contact.model';
import {ComponentStore} from '@ngrx/component-store';
import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {catchError, concatMap, filter, switchMap, tap} from 'rxjs/operators';
import {ContactsService} from '../services/contacts.service';
import {HotToastService} from '@ngneat/hot-toast';
import {DialogService} from '@ngneat/dialog';
import {trigger} from '@angular/animations';
import {AddContactComponent} from '../components/add-contact/add-contact.component';

export interface ContactsState {
  contacts: Contact[];
  searchString: string;
}

@Injectable()
export class ContactsStore extends ComponentStore<ContactsState> {

  constructor(
    private contactsService: ContactsService,
    private toast: HotToastService,
    private dialog: DialogService
  ) {
    super({
      contacts: [],
      searchString: '',
    });

    this.fetchContacts();
  }

  readonly filteredContacts$: Observable<Contact[]> = this.select(
    ({contacts, searchString}) =>
      contacts.filter((c) =>
        c.name.toLowerCase().includes(searchString.toLowerCase())
      )
  );

  readonly setContacts = this.updater((state, contacts: Contact[]) => ({
    ...state,
    contacts,
  }));

  readonly fetchContacts = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.contactsService.fetchContacts().pipe(
          this.toast.observe({
            loading: 'Fetching...',
            success: 'Contacts fetched!',
            error: 'Could not fetch.',
          }),
          tap((contacts: Contact[]) => {
            this.setContacts(contacts);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly showAddDialog = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() => this.dialog.open(AddContactComponent).afterClosed$),
      filter((contact) => !!contact),
      tap((contact) => {
        // @ts-ignore
        this.addContact(contact);
      })
    )
  );

  readonly addContact = this.effect<Contact>((contact$) =>
    contact$.pipe(
      concatMap((contact) =>
        this.contactsService.addContact(contact).pipe(
          tap(() => this.fetchContacts()),
          this.toast.observe({
            loading: 'Adding contact...',
            success: 'Contact added!',
            error: 'Could not add.',
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly deleteContact = this.effect<Contact>((contact$) =>
    contact$.pipe(
      concatMap((contact) =>
        this.contactsService.deleteContact(contact).pipe(
          this.toast.observe({
            loading: 'Deleting contact...',
            success: 'Contact deleted!',
            error: 'Could not delete.',
          }),
          tap(() => this.fetchContacts()),
          catchError(() => EMPTY)
        )
      )
    )
  );
}


