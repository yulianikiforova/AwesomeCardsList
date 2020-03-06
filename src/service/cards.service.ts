import { Card } from '../model/card';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

interface CardData {
  id: string;
  imageUrl: string;
  name: string;
  text: string;
  set: {
    name: string,
  };
  type: string;
}

export interface CardsListResponse {
  cards: CardData[];
}

const PAGE_SIZE = 20;

function toCard(cardData: CardData): Card {
  return {
    id: cardData.id,
    imageUrl: cardData.imageUrl,
    name: cardData.name,
    text: cardData.text,
    setName: cardData.set.name,
    type: cardData.type,
  };
}

@Injectable()
export class CardsService {
  endpoint = environment.API_URL;

  constructor(private http: HttpClient) { }

  getCards(page = 1, search = ''): Observable<Card[]> {
    let urlParams = new HttpParams()
        .set('page', String(page))
        .set('pageSize', String(PAGE_SIZE));

    if (search) {
      urlParams = urlParams.set('name', search);
    }

    return this.http.get<CardsListResponse>(this.endpoint, {params: urlParams}).pipe(
      map<CardsListResponse, Card[]>(
        (cardsListResponse: CardsListResponse) => {
          return cardsListResponse.cards.map(toCard);
      })
    );
  }

}
