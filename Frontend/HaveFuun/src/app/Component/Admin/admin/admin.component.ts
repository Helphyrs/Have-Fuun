import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AdminServiceService } from '../../../Services/Api/admin-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  data!: Observable<any>;
  users!: any;
  display: string = "home";

  constructor(private activatedRoute: ActivatedRoute, private adminS: AdminServiceService) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.data.pipe(map((data: { [x: string]: any; }) => data['adminUsers']));
    this.data.forEach(info => {
      this.users = info;
    });
  }

  displayUsers(elem: string): void {
    this.display = elem;
  }
  deleteComment(id: number) {
    let bool: boolean = confirm('Êtes vous sûr de supprimer cet user ?');
    if (bool) {
      this.adminS.deleteUserByIdAdmin(id).subscribe((response) => { }, (error) => {
        if (error.error === "Access forbidden : you cannot delete another admin") {
          alert('Vous ne supprimez pas un autre administrateur')
        } else {
          alert("L'utilisateur a bien été supprimé vous le verrez lors de la prochaine actualisation");
          this.display = "home";
        }
      })
    }
  }
}
