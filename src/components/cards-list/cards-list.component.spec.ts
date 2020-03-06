import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { Card } from '../../model/card';
import { CardsListComponent } from './cards-list.component';
import { CardsService, CardsListResponse } from '../../service/cards.service';

class MockCardsService {
  getCards(page = 1, search = ''): Observable<Card[]> {
    return new Observable();
  }
}

describe('CardsListComponent', () => {
  let cardsListComponent: CardsListComponent;
  let cardsService: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardsListComponent,
        { provide: CardsService, useClass: MockCardsService },
      ],
    });
    cardsListComponent = TestBed.inject(CardsListComponent);
    cardsService = TestBed.inject(CardsService);
  });

  it('should load cards on ngOnInit', () => {
    spyOn(cardsService, 'getCards').and.callThrough();
    cardsListComponent.ngOnInit();
    expect(cardsService.getCards).toHaveBeenCalledWith(1, '');
  });

  it('should load cards on scroll', () => {
    spyOn(cardsService, 'getCards').and.callThrough();
    cardsListComponent.onScrolled();
    expect(cardsService.getCards).toHaveBeenCalledWith(2, '');
  });

  it('should search by name', () => {
    spyOn(cardsService, 'getCards').and.callThrough();
    cardsListComponent.page = 4;
    cardsListComponent.onSearch('abc');
    expect(cardsService.getCards).toHaveBeenCalledWith(1, 'abc');
    expect(cardsListComponent.page).toEqual(1);
    expect(cardsListComponent.search).toEqual('abc');
  });
});
