import { Component } from '@angular/core';
import { ArrayVisualizerComponent } from '../array-visualizer/array-visualizer.component';

@Component({
  selector: 'app-insertion-sort',
  standalone: true,
  imports: [ArrayVisualizerComponent],
  templateUrl: './insertion-sort.component.html',
  styleUrl: './insertion-sort.component.scss'
})
export class InsertionSortComponent {
  algoStr: string = "InsertionSort";
}
