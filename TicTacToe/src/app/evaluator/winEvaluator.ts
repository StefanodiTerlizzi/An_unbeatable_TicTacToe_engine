import { EvaluatorComponent } from './evaluator';
export class winEvaluator extends EvaluatorComponent {
    next: EvaluatorComponent;
  
    constructor(next: EvaluatorComponent){
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