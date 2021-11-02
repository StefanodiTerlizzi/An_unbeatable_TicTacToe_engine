import { EvaluatorComponent } from './evaluator';

export class forkEval extends EvaluatorComponent  {
    next: EvaluatorComponent;
  
    constructor(next: EvaluatorComponent){
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