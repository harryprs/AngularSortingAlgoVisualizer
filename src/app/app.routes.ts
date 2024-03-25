import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { QuickSortComponent } from './quick-sort/quick-sort.component';
import { InsertionSortComponent } from './insertion-sort/insertion-sort.component';
import { SelectionSortComponent } from './selection-sort/selection-sort.component';

export const routes: Routes = [
    { path: 'app', component: AppComponent },
    { path: 'app-bubble-sort', component: BubbleSortComponent },
    { path: 'app-quick-sort', component: QuickSortComponent },
    { path: 'app-insertion-sort', component: InsertionSortComponent },
    { path: 'app-selection-sort', component: SelectionSortComponent }
];
