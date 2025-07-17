import { Component } from '@angular/core';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    MatDrawerContainer,
    NgStyle,
    MatIcon,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  candidate: any = {} as any;
  pagination = {
    length: 0,
    pageIndex: 0,
    pageSize: 5,
  };


  constructor(
      public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // this.loadCandidates();
    this.loadCandidate();
  }
  loadCandidate() {

  }

}


