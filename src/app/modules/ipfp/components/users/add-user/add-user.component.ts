import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addUser() {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (rest) => {
          this.userForm.reset();
          console.log('Utilisateur ajouté', rest);
        },
        error: (err) => {
          console.error('Erreur d\'ajout', err);

        }
      });
    }
  }

