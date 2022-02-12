import { Component, OnInit } from '@angular/core';
import { BackendService } from './shared/services/backend.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'contacts-list';
  constructor(private authService: AuthService, private backendService: BackendService) {

  }
  ngOnInit(): void {
  }
}
