import { Component, Input, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
 
})
export class GameInfoComponent implements OnChanges {
  cardAction = [
    {
      title: 'Waterfall',
      description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.',
    },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    {
      title: 'Category',
      description:'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.',
    },
    {
      title: 'Bust a jive',
      description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ',
    },
    { title: 'Chicks', description: 'All girls drink.' },
    {
      title: 'Heaven',
      description: 'Put your hands up! The last player drinks!',
    },
    {
      title: 'Mate',
      description: 'Pick a mate. Your mate must always drink when you drink and the other way around.',
    },
    { title: 'Thumbmaster', description: '' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: '' },
    {
      title: 'Never have i ever...',
      description: 'Say something you nnever did. Everyone who did it has to drink.',
    },
    {
      title: 'Rule',
      description: 'Make a rule. Everyone needs to drink when he breaks the rule.',
    },
  ];

  @Input() card!: string;
  title: string = '';
  description: string = '';

  ngOnChanges(): void {
    console.log('Current card is:', this.card);
    if (this.card) {
      const parts = this.card.split('_');
      const cardNumber = Number(parts[1]);
      const rule = this.cardAction[cardNumber - 1];
      this.title = rule?.title || '';
      this.description = rule?.description || '';
    } else {
      this.title = '';
      this.description = '';
    }
  }
}

