import { Component } from '@angular/core';
import { ArrayVisualizerComponent } from '../array-visualizer/array-visualizer.component';

@Component({
  selector: 'app-selection-sort',
  standalone: true,
  imports: [ArrayVisualizerComponent],
  templateUrl: './selection-sort.component.html',
  styleUrl: './selection-sort.component.scss'
})
export class SelectionSortComponent {
  algoStr: string = "SelectionSort";
}
