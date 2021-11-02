import { EvaluatorComponent } from './evaluator';
export class emptySide extends EvaluatorComponent {

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