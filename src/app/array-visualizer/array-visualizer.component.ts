import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RouterCommService } from '../services/routerComm.service';
import { Subscription } from 'rxjs';
import { SolverSettings } from '../helpers/solver-settings';

@Component({
  selector: 'app-array-visualizer',
  standalone: true,
  imports: [],
  templateUrl: './array-visualizer.component.html',
  styleUrl: './array-visualizer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush   
})

export class ArrayVisualizerComponent implements OnDestroy {
  @Input() algo: string = "";
  arraySize: number|null = 50;
  speed: number = 1;

  barData: BarColumn[] = new Array();
  barWidth = "0%";
  subscription: Subscription;
  announceSolveSub: Subscription;
  announceShuffleSub: Subscription;

  leftBar = -1;
	rightBar = -1;
	pivotBar = -1;
	movedBar = -1;

  sleep = (ms: number) => new Promise(r => { setTimeout(r, ms), ""});

  constructor(private cd: ChangeDetectorRef, private routerCommService: RouterCommService) {
    this.subscription = routerCommService.generateAnnounced$.subscribe(
      obj => {
        this.arraySize = obj;
        this.GenerateArray();
      }
    )
    this.announceShuffleSub = routerCommService.shuffleAnnounced$.subscribe(
      () => {
        this.ShuffleArray();
      }
    )
    this.announceSolveSub = routerCommService.solveAnnounced$.subscribe(
      msg => {
        this.Solve(msg);
      }
    )
    setInterval(() => {
      this.cd.detectChanges();
    }, 100);

    this.GenerateArray();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.announceShuffleSub.unsubscribe();
    this.announceSolveSub.unsubscribe();
  }

  GenerateArray() {
    this.barData = new Array();
    for(var i = 0; i < this.arraySize!; i++) {
      this.barData.push(new BarColumn(Math.floor(Math.random() * 500), "grey"));
    }
    this.barWidth = this.GetBarWidth();
  }

  ShuffleArray()
  {
    this.ClearStyling();
    var n = this.arraySize!;
    while(n > 1)
    {
      var k = Math.floor(Math.random() * n--)
      var temp = this.barData[n];
      this.barData[n] = this.barData[k];
      this.barData[k] = temp;
    }
  }

  Solve(solverSettings: SolverSettings)
  {
    this.speed = solverSettings.delay;
    if(this.algo == "BubbleSort")
    {
      this.BubbleSort();
    }
    if(this.algo == "QuickSort")
    {
      this.QuickSortRun();
    }
    if(this.algo == "InsertionSort")
    {
      this.InsertionSort();
    }
    if(this.algo == "SelectionSort")
    {
      this.SelectionSort();
    }
  }

  async BubbleSort()
  {
    for(var i = this.arraySize!-1; i >= 0; i--)
		{
			for(var j = 0; j < i; j++)
			{
				this.leftBar = j;
        this.barData[this.leftBar].color = "red";
				this.rightBar = j + 1;
        this.barData[this.rightBar].color = "red";
				if(this.barData[j].height > this.barData[j+1].height)
				{
					var temp = this.barData[j];
					this.barData[j] = this.barData[j + 1];
					this.barData[j + 1] = temp;
          await this.sleep(this.speed);
				}
        this.barData[this.leftBar].color = "grey";
        this.barData[this.rightBar].color = "grey";
			}
      this.barData[i].color = "white";
		}
    this.routerCommService.confirmSolve("done");
  }

  async QuickSortRun()
  {
    await this.QuickSort(0, this.barData.length-1);
    for (var i = 0; i < this.barData.length; i++)
		{
      this.barData[i].color = "white";
			await this.sleep(10);
		}
    this.routerCommService.confirmSolve("done");
  }

  async QuickSort(leftIndex: number, rightIndex: number) {
    var i = leftIndex;
		var j = rightIndex;
		var pivot = this.barData[leftIndex].height;
		this.pivotBar = leftIndex;
		while (i <= j)
		{
			while (this.barData[i].height < pivot)
			{
				i++;
			}

			while (this.barData[j].height > pivot)
			{
				j--;
			}
			if (i <= j)
			{
				this.leftBar = i;
				this.rightBar = j;
				var temp = this.barData[i];
				this.barData[i] = this.barData[j];
				this.barData[j] = temp;
				await this.sleep(this.speed);
				i++;
				j--;
			}
		}

		if (leftIndex < j)
			await this.QuickSort(leftIndex, j);
		if (i < rightIndex)
			await this.QuickSort(i, rightIndex);
  }

  async InsertionSort()
	{
    var tempMovedBar: BarColumn = new BarColumn(0, "grey");
    var tempRightBar: BarColumn = new BarColumn(0, "grey");
		for (var i = 1; i < this.barData.length; i++)
		{
			var j = i;
			while (j >= 1 && this.barData[j].height < this.barData[j - 1].height)
			{
				var temp = this.barData[j];
				this.barData[j] = this.barData[j - 1];
				this.barData[j - 1] = temp;
				j--;
				this.rightBar = j;
        tempRightBar = this.barData[this.rightBar];
        tempRightBar.color = "red";
				await this.sleep(this.speed);
			}
      tempMovedBar.color = "grey";
			this.movedBar = j;
      tempMovedBar = this.barData[this.movedBar];
      tempMovedBar.color = "yellow";
		}

		for(var i = 0; i < this.barData.length; i++)
		{
      this.barData[i].color = "white";
			await this.sleep(10);
		}
    this.routerCommService.confirmSolve("done");
	}

  async SelectionSort()
	{
    this.rightBar = 0;
		var min;
		for(var i = 0; i < this.barData.length; i++)
		{
			min = i;
			this.movedBar = i;
      this.barData[this.movedBar].color = "yellow";
			for(var j = i+1; j < this.barData.length; j++)
			{
        this.barData[j].color = "lightgrey";
        await this.sleep(this.speed);
				if(this.barData[j].height < this.barData[min].height)
				{
          this.barData[min].color = "lightgrey";
					min = j;
          this.barData[min].color = "red";
					this.rightBar = min;
          await this.sleep(this.speed);
				}
			}

      for(var j = i+1; j < this.barData.length; j++)
      {
        this.barData[j].color = "grey";
      }

			if(min != i)
			{
				var temp = this.barData[min];
				this.barData[min] = this.barData[i];
				this.barData[i] = temp;
				await this.sleep(this.speed);
			}
      this.barData[this.rightBar].color = "grey";
      this.barData[i].color = "white";
		}
    this.routerCommService.confirmSolve("done");
	}

  ClearStyling() {
    for(var i = 0; i < this.barData.length; i++)
    {
      this.barData[i].color = "grey";
    }
    this.leftBar = -1;
		this.rightBar = -1;
		this.pivotBar = -1;
		this.movedBar = -1;
  }

  GetBarWidth() {
    return (100.0 / this.barData.length) + "%";
  }
}

class BarColumn {
  height: number = 0;
  color: string = "";

  constructor(height: number, color: string) {
    this.height = height;
    this.color = color;
  }
}