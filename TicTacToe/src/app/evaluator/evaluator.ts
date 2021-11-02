export abstract class EvaluatorComponent{
  
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

  constructor() { }

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