import { Component } from '@angular/core';
import { winEvaluator } from "./evaluator/winEvaluator";
import { blockEval } from "./evaluator/blockEval";
import { forkEval } from "./evaluator/forkEval";
import { blockForkEval } from "./evaluator/blockForkEval";
import { emptyCorner } from "./evaluator/emptyCorner";
import { emptySide } from "./evaluator/emptySide";
import { EvaluatorComponent } from './evaluator/evaluator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  player=0;
  title = 'TicTacToe';
  rows = [0,1,2];
  columns = [0,1,2];
  matrix: any[] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  

  

  chainEvaluation: EvaluatorComponent =
  new winEvaluator(
    new blockEval(
      new forkEval(
        new blockForkEval(
          new emptyCorner(
            new emptySide()
          )
        )
      )
    )
  );

  move(row: number, col: number): void {
    if (this.full() == true) {
      console.log("finish game");
      return;
    }

    if (this.matrix[row][col] == null) {
      this.matrix[row][col] = this.player;
      this.player = (this.player+1)%2;
    }
    if (this.player == 1) {
      console.log("this.player: "+this.player)
      let obj = this.evaluate();
      this.move( Number(obj.get("r")), Number(obj.get("c")) );
    }
  }

  full(): boolean {
    let full = true;
    for (const row of this.rows) {
      for (const col of this.columns) {
        if (this.matrix[row][col] == null) {
          full = false;
          break;
        }
      } 
    }
    return full;
  }

  playerToString(player: number): string {
    switch (player) {
      case 0:
        return "X";
        break;
      case 1:
        return "O";
        break;
      default:
        return "";
        break;
    }
  }

  evaluate(): Map<string, number> {
    return this.chainEvaluation.evaluate(this.matrix);
  }

  reset(): void {
    console.log("reset");
    for (const row of this.rows) {
      for (const col of this.columns) {
        this.matrix[row][col] = null;
      }
    }
  }

}

/*
abstract class chain {
  private Cell_0_0 = [0,0];
  private Cell_0_1 = [0,1];
  private Cell_0_2 = [0,2];
  private Cell_1_0 = [1,0];
  private Cell_1_1 = [1,1];
  private Cell_1_2 = [1,2];
  private Cell_2_0 = [2,0];
  private Cell_2_1 = [2,1];
  private Cell_2_2 = [2,2];

  private possibleTris = [
    //orizontal
    [this.Cell_0_0, this.Cell_0_1, this.Cell_0_2],
    [this.Cell_1_0, this.Cell_1_1, this.Cell_1_2],
    [this.Cell_2_0, this.Cell_2_1, this.Cell_2_2],
    //vertical
    [this.Cell_0_0, this.Cell_1_0, this.Cell_2_0],
    [this.Cell_0_1, this.Cell_1_1, this.Cell_2_1],
    [this.Cell_0_2, this.Cell_1_2, this.Cell_2_2],
    //cross
    [this.Cell_0_0, this.Cell_1_1, this.Cell_2_2],
    [this.Cell_0_2, this.Cell_1_1, this.Cell_2_0]
  ];

  abstract evaluate(matrix: number[][]): Map<string, number>;

  findTris(matrix: number[][],player: number) : any {
    for (const tris of this.possibleTris) {
      let a = tris[0];
      let b = tris[1];
      let c = tris[2];
      let trisToCheck = [matrix[a[0]][a[1]],matrix[b[0]][b[1]],matrix[c[0]][c[1]]];
      let checkForTris = this.missingForTris(trisToCheck, player);

      //console.log("after missingForTris: "+checkForTris);
      
      if ( checkForTris != null ) {
        console.log("possible tris: ", tris[checkForTris]+ " for player: ", player);
        let r = tris[checkForTris][0];
        let c = tris[checkForTris][1];
        return new Map([ ["r", r],["c", c] ]);
      }
      
    }
    return null;
  }

  missingForTris(tris: number[], player: number): any {
    if (tris[0] == player && tris[1] == player && tris[2] == null) {
      return 2;
    } else if (tris[1] == player && tris[2] == player && tris[0] == null) {
      return 0;
    } else if (tris[0] == player && tris[2] == player && tris[1] == null) {
      return 1;
    }
    return null;
  }

  findFork(matrix: number[][],player: number) : any {
    return null;
  }

}


class winEval extends chain {
  next: chain;

  constructor(next: chain){
    super();
    this.next = next;
  }

  evaluate(matrix: number[][]): Map<string, number> {
    console.log("winEval");
    let map = this.findTris(matrix, 1);
    if (map == null) {
      return this.next.evaluate(matrix);
    } else {
      return map;
    }
  }
  

}


class blockEval extends chain {
  next: chain;

  constructor(next: chain){
    super();
    this.next = next;
  }

  evaluate(matrix: number[][]): Map<string, number> {
    console.log("blockEval");
    let map = this.findTris(matrix, 0);
    if (map == null) {
      return this.next.evaluate(matrix);
    } else {
      return map;
    }
  }
  

}
*/
/*
class forkEval extends chain  {
  next: chain;

  constructor(next: chain){
    super();
    this.next = next;
  }

  evaluate(matrix: number[][]): Map<string, number> {
    if (this.findFork(matrix, 1) != null) {
      return new Map([ ["r", 0],["c", 0] ]);
    } else {
      return this.next.evaluate(matrix);
    }  
  }
  
}
*/
/*
class blockForkEval extends chain  {
  next: chain;

  constructor(next: chain){
    super();
    this.next = next;
  }

  evaluate(matrix: number[][]): Map<string, number> {
    if (this.findFork(matrix, 0) != null) {
      return new Map([ ["r", 0],["c", 0] ]);
    } else {
      return this.next.evaluate(matrix);
    }  
  }
  
}
class emptyCorner extends chain {
  next: chain;

  constructor(next: chain){
    super();
    this.next = next;
  }

  evaluate(matrix: number[][]): Map<string, number> {
    console.log("emptyCorner");
    if (matrix[0][0] == null) {
      return new Map([ ["r", 0],["c", 0] ]);
    } else if (matrix[0][2] == null) {
      return new Map([ ["r", 0],["c", 2] ]);
    } else if (matrix[2][2] == null) {
      return new Map([ ["r", 2],["c", 2] ]);
    } else if (matrix[2][0] == null) {
      return new Map([ ["r", 2],["c", 0] ]);
    } else {
      return this.next.evaluate(matrix);
    }
  }

}

class emptySide extends chain {

  evaluate(matrix: number[][]): Map<string, number> {
    console.log("emptySide")
    if (matrix[1][1] == null) {
      return new Map([ ["r", 1],["c", 1] ]);
    } else if (matrix[1][0] == null) {
      return new Map([ ["r", 1],["c", 0] ]);
    } else if (matrix[0][1] == null) {
      return new Map([ ["r", 0],["c", 1] ]);
    } else if (matrix[1][2] == null) {
      return new Map([ ["r", 1],["c", 2] ]);
    } else if (matrix[2][1] == null) {
      return new Map([ ["r", 2],["c", 1] ]);
    }
    return new Map([ ["finish", -1] ]);
  }
  

}

*/