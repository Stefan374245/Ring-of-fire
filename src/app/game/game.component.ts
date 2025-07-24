import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { AddPlayerDialogComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule, // <-- Das Modul, nicht das Service!
    AddPlayerDialogComponent,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  hoveredCard: number | null = null;
  game: Game = new Game();

  isTopCardAnimating: boolean = false;
  animatingCard: string | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  onCardHover(cardIndex: number) {
    this.hoveredCard = cardIndex;
  }

  takeCard() {
      if (this.game.players.length === 0) {
    alert('Bitte zuerst mindestens einen Spieler hinzufügen!');
    return;
  }
    if (!this.isTopCardAnimating && this.game.stack.length > 0) {
 
      this.animatingCard = this.game.stack.shift()!;
      this.game.currentCard = this.animatingCard;
      this.isTopCardAnimating = true;
    }
    if (this.game.players.length > 0) {
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
  }
}

  onTopCardAnimationEnd() {
    this.isTopCardAnimating = false;
 
    if (this.game.currentCard) {
      this.game.playedCards.push(this.game.currentCard);
      this.game.currentCard = null;
    }
    this.animatingCard = null;
  }

  // Hilfsfunktion, um das Bild für eine Karte zu bekommen
  getCardImage(card: string): string {
    // Beispiel: 'spade_1' -> '/assets/img/cards/spade_1.png'
    return `assets/img/cards/${card}.png`;
  }

  trackByCard(index: number, card: string) {
    return card;
  }
  // Gibt die sichtbaren Karten im Stack zurück (maximal 5, oder weniger wenn Stack kleiner)
  getVisibleStack(): string[] {
    // Wenn eine Karte animiert, ist sie schon aus dem Stack entfernt
    // Zeige maximal 5 Karten, aber wenn animatingCard aktiv ist, eine weniger
    const max = this.isTopCardAnimating && this.animatingCard ? 4 : 5;
    return this.game.stack.slice(0, max);
  }

  getPlayedCardStacks(): string[][] {
  const stacks: string[][] = [];
  const cards = this.game.playedCards.slice(0, -1); // letzte Karte bleibt oben
  for (let i = 0; i < cards.length; i += 5) {
    stacks.push(cards.slice(i, i + 5));
  }
  return stacks;
}

  openDialog(): void {
    if (this.game.players.length >= 6) {
    alert('Es können maximal 8 Spieler hinzugefügt werden!');
    return;
  }
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);
    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result && result.trim().length > 0) {
        this.game.players.push(result.trim());
      }
    });
  }
  
}
