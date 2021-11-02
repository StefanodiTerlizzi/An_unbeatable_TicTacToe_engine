import { EvaluatorComponent } from './evaluator';

export class blockEval extends EvaluatorComponent {
    next: EvaluatorComponent;
  
    constructor(next: EvaluatorComponent){
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