import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Card } from '../model/card';
import { CardsService, CardsListResponse } from './cards.service';

const TEST_CARDS_LIST_RESPONSE: CardsListResponse = {
  cards: [{
    id: '1',
    imageUrl: 'http://test_image_url_1',
    name: 'Test name 1',
    text: 'Test text 1',
    set: {
      name: 'Test set name 1',
    },
    type: 'Support',
  }, {
    id: '2',
    imageUrl: 'http://test_image_url_2',
    name: 'Test name 2',
    text: 'Test text 2',
    set: {
      name: 'Test set name 2',
    },
    type: 'Creature',
  }],
};
const EXPECTED_CARDS_LIST: Card[] = [{
  id: '1',
  imageUrl: 'http://test_image_url_1',
  name: 'Test name 1',
  text: 'Test text 1',
  setName:'Test set name 1',
  type: 'Support',
}, {
  id: '2',
  imageUrl: 'http://test_image_url_2',
  name: 'Test name 2',
  text: 'Test text 2',
  setName: 'Test set name 2',
  type: 'Creature',
}];
const TEST_URL = 'https://api.elderscrollslegends.io/v1/cards?page=1&pageSize=20';
const TEST_URL_WITH_PAGE_NUMBER_AND_SEARCH =
    'https://api.elderscrollslegends.io/v1/cards?page=2&pageSize=20&name=abc';

describe('CardsService', () => {
  let httpMock: HttpTestingController;
  let cardsService: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardsService],
    });
    httpMock = TestBed.inject(HttpTestingController);
    cardsService = TestBed.inject(CardsService);
  });

  it('should be injected', () => {
    expect(cardsService).toBeTruthy();
  });

  it('should request cards list without params', () => {
    cardsService.getCards().subscribe((cardsList: Card[]) => {
      expect(cardsList).toEqual(EXPECTED_CARDS_LIST);
    });

    const mockReq = httpMock.expectOne(TEST_URL);

    expect(mockReq.cancelled).toBeFalsy();
    mockReq.flush(TEST_CARDS_LIST_RESPONSE);
  });

  it('should request cards list with page number and search', () => {
    cardsService.getCards(2, 'abc').subscribe((cardsList: Card[]) => {
      expect(cardsList).toEqual(EXPECTED_CARDS_LIST);
    });

    const mockReq = httpMock.expectOne(TEST_URL_WITH_PAGE_NUMBER_AND_SEARCH);

    expect(mockReq.cancelled).toBeFalsy();
    mockReq.flush(TEST_CARDS_LIST_RESPONSE);
  });
});
