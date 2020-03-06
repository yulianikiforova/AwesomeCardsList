import { Component, OnInit } from '@angular/core';

import { Card } from '../../model/card';
import { CardsService } from '../../service/cards.service';

@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {
  cards: Card[] = [];
  page = 1;
  search = '';
  isLoading = true;

  constructor(private readonly cardsService: CardsService) {}

  ngOnInit() {
    this.loadCards();
  }

  onScrolled() {
    this.page++;
    this.loadCards();
  }

  onSearch(search: string) {
    this.search = search;
    this.page = 1;
    this.searchCards();
  }

  searchCards() {
    this.isLoading = true;
    this.cardsService.getCards(this.page, this.search).subscribe((data) => {
      this.cards = data;
      this.isLoading = false;
    });
  }

  loadCards() {
    this.isLoading = true;
    this.cardsService.getCards(this.page, this.search).subscribe((data) => {
      this.cards.push(...data);
      this.isLoading = false;
    });
  }

  trackByFn(index: number, card: Card) {
    return card.id;
  }
}
