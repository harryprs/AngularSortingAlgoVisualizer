import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ArrayVisualizerComponent } from '../array-visualizer/array-visualizer.component';

@Component({
  selector: 'app-bubble-sort',
  standalone: true,
  imports: [ArrayVisualizerComponent],
  templateUrl: './bubble-sort.component.html',
  styleUrl: './bubble-sort.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush   
})
export class BubbleSortComponent {
  algoStr: string = "BubbleSort";
}
