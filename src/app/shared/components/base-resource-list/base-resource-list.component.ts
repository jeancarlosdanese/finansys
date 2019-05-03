import { OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import toastr from 'toastr';
import { ResultList } from '../../models/result-list.model';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  result: ResultList;
  links: string[];
  resources: T[] = [];
  resourceSelected: T;

  protected page = '1';
  protected limit = '9999999999';
  protected start = '0';

  protected route: ActivatedRoute;
  protected router: Router;
  // serverErrorMessages: string[] = undefined;

  constructor(
    protected injector: Injector,
    protected resourceService: BaseResourceService<T>
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
  }

  ngOnInit() {

  }

  deleteResource() {
    // const mustDelete = confirm('Deseja realmente excluir este item?');
    // console.log(this.resourceSelected);

    // if (mustDelete) {
    this.resourceService.delete(this.resourceSelected._id)
      .subscribe(
        () => this.resources = this.resources.filter(element => element !== this.resourceSelected),
        respError => {
          toastr.error('Erro ao tentar excluir o registro. ' + respError.error.message);

          // this.serverErrorMessages = ['Erro ao tentar excluir o registro. ' + respError.error.message];
        }
      );
    // }
  }

  setResourceSelected(resource) {
    this.resourceSelected = resource;
  }

  protected loadPage(url: string) {
    console.log(url);

    this.resourceService.getPage(url)
      .subscribe(result => {
        this.result = result;
        // this.resources.push.apply(this.result.results);
        Array.prototype.push.apply(this.resources, this.result.results);
        this.links = this.result._links;
      },
        error => alert('Erro ao carrregar a lista')
      );
  }
}
