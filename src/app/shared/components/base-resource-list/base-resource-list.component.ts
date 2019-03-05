import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import toastr from 'toastr';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  resourceSelected: T;
  serverErrorMessages: string[] = undefined;

  constructor(
    protected resourceService: BaseResourceService<T>
  ) { }

  ngOnInit() {
    this.resourceService.getAll()
      .subscribe(resources => this.resources = resources,
                 error => alert('Erro ao carrregar a lista'));
  }

  deleteCategory() {
    // const mustDelete = confirm('Deseja realmente excluir este item?');
    // console.log(this.resourceSelected);

    // if (mustDelete) {
    this.resourceService.delete(this.resourceSelected._id)
      .subscribe(
        () => this.resources = this.resources.filter(element => element !== this.resourceSelected),
        respError => {
          toastr.error('Erro ao tentar excluir o registro. ' + respError.error.message);

          this.serverErrorMessages = ['Erro ao tentar excluir o registro. ' + respError.error.message];
        }
      );
    // }
  }

  setResourceSelected(resource) {
    this.resourceSelected = resource;
  }

}
