import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SolverSettings } from '../helpers/solver-settings';

@Injectable()
export class RouterCommService {

    // Observable string sources
    private generateAnnouncedSource = new Subject<number>();
    private shuffleAnnouncedSource = new Subject<number>();
    private solveAnnouncedSource = new Subject<SolverSettings>();
    private solveConfirmedSource = new Subject<string>();
  
    // Observable string streams
    generateAnnounced$ = this.generateAnnouncedSource.asObservable();
    shuffleAnnounced$ = this.shuffleAnnouncedSource.asObservable();
    solveAnnounced$ = this.solveAnnouncedSource.asObservable();
    solveConfirmed$ = this.solveConfirmedSource.asObservable();

    // Service message commands
    announceGenerate(msg: number) {
        this.generateAnnouncedSource.next(msg);
    }

    announceShuffle(msg: number) {
        this.shuffleAnnouncedSource.next(msg);
    }

    announceSolve(msg: SolverSettings) {
        this.solveAnnouncedSource.next(msg);
    }

    confirmSolve(msg: string) {
        this.solveConfirmedSource.next(msg);
    }
  }