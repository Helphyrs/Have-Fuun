import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsServiceService } from '../Api/forms-service.service';
import { Form } from '../../Models/formModel';

@Injectable({
  providedIn: 'root'
})
export class FormsResolverService implements Resolve<Form[] | Form> {

  constructor(private fS: FormsServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Form[] | Form> {
    let formName: string = route.params['name'];
    return formName ? this.fS.getFormByName(formName) : this.fS.getAllForms();
  }
}
