import { Component, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { ArrayVisualizerComponent } from '../array-visualizer/array-visualizer.component';

@Component({
  selector: 'app-quick-sort',
  standalone: true,
  imports: [ArrayVisualizerComponent],
  templateUrl: './quick-sort.component.html',
  styleUrl: './quick-sort.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush   
})
export class QuickSortComponent {
  algoStr: string = "QuickSort";
}
