import { Component, Input } from '@angular/core';

import { Card } from '../../model/card';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card;
}
