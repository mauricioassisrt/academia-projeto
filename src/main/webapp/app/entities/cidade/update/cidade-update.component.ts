import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

import {ICidade, Cidade} from '../cidade.model';
import {CidadeService} from '../service/cidade.service';
import {EstadoService} from 'app/entities/estado/service/estado.service';
import {IUser} from 'app/entities/user/user.model';
import {UserService} from 'app/entities/user/user.service';
import {IEstado} from "../../estado/estado.model";
import {ASC, DESC} from "../../../config/pagination.constants";

@Component({
  selector: 'jhi-cidade-update',
  templateUrl: './cidade-update.component.html',
})
export class CidadeUpdateComponent implements OnInit {
  nomeEstado: string | undefined = "";
  estado:IEstado={};
  isSaving = false;
  estadosSharedCollection: IEstado[] = [];
  usersSharedCollection: IUser[] = [];

  constructor(
    protected cidadeService: CidadeService,
    protected estadoService: EstadoService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({cidade}) => {
      this.updateForm(cidade);
      this.estado=cidade.estado
      this.loadRelationshipsOptions();
    });
  }
  editForm = this.fb.group({
    id: [],
    nomeCidade: [null, [Validators.required, Validators.minLength(3)]],
    observacao: [null, [Validators.minLength(20)]],
    estado: [],
    user: [],
  });
  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cidade = this.createFromForm();
    if (cidade.id !== undefined) {
      this.subscribeToSaveResponse(this.cidadeService.update(cidade));
    } else {
      this.subscribeToSaveResponse(this.cidadeService.create(cidade));
    }
  }

  trackEstadoById(_index: number, item: IEstado): number {
    return item.id!;
  }

  trackUserById(_index: number, item: IUser): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICidade>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(cidade: ICidade): void {
    this.editForm.patchValue({
      id: cidade.id,
      nomeCidade: cidade.nomeCidade,
      observacao: cidade.observacao,
      estado: cidade.estado,
      user: cidade.user,
    });
    this.nomeEstado = cidade.estado?.nomeEstado;
    this.estadosSharedCollection = this.estadoService.addEstadoToCollectionIfMissing(this.estadosSharedCollection,
      cidade.estado);
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection,
      cidade.user);
  }

  protected loadRelationshipsOptions(): void {
    this.estadoService
      .query()
      .pipe(map((res: HttpResponse<IEstado[]>) => res.body ?? []))
      .pipe(map((estados: IEstado[]) => this.estadoService.addEstadoToCollectionIfMissing(estados,
        this.editForm.get('estado')!.value)))
      .subscribe((estados: IEstado[]) => (this.estadosSharedCollection = estados));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users,
        this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): ICidade {

    return {
      ...new Cidade(),
      id: this.editForm.get(['id'])!.value,
      nomeCidade: this.editForm.get(['nomeCidade'])!.value,
      observacao: this.editForm.get(['observacao'])!.value,
      estado: this.estado,
      user: this.editForm.get(['user'])!.value,
    };
  }

  /**
   * Recebe do campo de pesquisa um valor e faz a busca do mesmo no endpoint
   * no qual retorna paginado o valor que contenha os dados informados
   * @param objetoEvent
   */
  public pesquisarEstadoPeloNome(objetoEvent: any) {
    this.estadosSharedCollection = []
    this.estadoService
      .query({
        page: 0,
        size: 30,
        'nomeEstado.contains': objetoEvent.target.value
      })
      .pipe(map((res: HttpResponse<IEstado[]>) => res.body ?? []))
      .pipe(map((estados: IEstado[]) => this.estadoService.addEstadoToCollectionIfMissing(estados, this.editForm.get('estado')!.value)))
      .subscribe((estados: IEstado[]) => (this.estadosSharedCollection = estados));

    if(this.estadosSharedCollection.length==0){
     const estado= this.editForm.get('estado')
     estado?.reset();
     }
  }

  /**
   * Usado para pegar o valor selecionado pelo usuáiro e add no objeto estado
   * @param estado
   */
  selecionarItem(estado: IEstado) {
    this.estado=estado
  }

}
