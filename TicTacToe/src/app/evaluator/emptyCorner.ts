import { EvaluatorComponent } from './evaluator';
export class emptyCorner extends EvaluatorComponent {
    next: EvaluatorComponent;
  
    constructor(next: EvaluatorComponent){
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