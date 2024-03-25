import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { RouterCommService } from './services/routerComm.service';
import { SolverSettings } from './helpers/solver-settings';
import { GeneratorSettings } from './helpers/generator-settings';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [RouterCommService]
})

export class AppComponent {
  isDisabled = false;
  solveIsDisabled = false;

  settingsForm = new FormGroup({
    delay: new FormControl({value: 50, disabled: this.isDisabled}, Validators.required),
    arraySize: new FormControl({value: 50, disabled: this.isDisabled}, Validators.required)
  });
  
  solverSettings = new SolverSettings();
  generatorSettings = new GeneratorSettings();

  title = 'Sorting Algorithm Visualizer';

  constructor(private routerCommService: RouterCommService) {
    routerCommService.solveConfirmed$.subscribe(
      () => {
        this.HandleSolveComplete()
      }
    );
  }

  HandleSolveComplete()
  {
    console.log("HandleComplete");
    this.EnableUI();
  }

  GenerateArray()
  {
    var aSize = this.settingsForm.controls["arraySize"].value;
    if(aSize != null && aSize > 1000) {
      this.settingsForm.controls["arraySize"].setValue(1000);
    } else if(aSize != null && aSize < 10) {
      this.settingsForm.controls["arraySize"].setValue(10);
    }
    this.routerCommService.announceGenerate(Number(this.settingsForm.controls["arraySize"].value));
  }

  ShuffleArray()
  {
    this.routerCommService.announceShuffle(1);
  }

  EnableUI()
  {
    this.isDisabled = false;
    this.settingsForm.controls["delay"].enable();
    this.settingsForm.controls["arraySize"].enable();
  }

  DisableUI()
  {
    this.isDisabled = true;
    this.settingsForm.controls["delay"].disable();
    this.settingsForm.controls["arraySize"].disable();
  }

  Solve()
  {
    this.solverSettings.delay = Number(this.settingsForm.controls["delay"].value);
    this.DisableUI();
    this.routerCommService.announceSolve(this.solverSettings);
  }
}