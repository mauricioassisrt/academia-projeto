import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPessoa, Pessoa } from '../pessoa.model';
import { PessoaService } from '../service/pessoa.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ICidade } from 'app/entities/cidade/cidade.model';
import { CidadeService } from 'app/entities/cidade/service/cidade.service';

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html',
})
export class PessoaUpdateComponent implements OnInit {
  isSaving = false;
  nomeUser: string="";
  nomeCidade: string="";
  usersSharedCollection: IUser[] = [];
  cidadesSharedCollection: ICidade[] = [];

  editForm = this.fb.group({
    id: [],
    cpf: [null, [Validators.required]],
    dataNascimento: [null, [Validators.required]],
    telefone: [null, [Validators.required]],
    rua: [null, [Validators.required, Validators.minLength(5)]],
    numero: [],
    bairro: [null, [Validators.required, Validators.minLength(5)]],
    cep: [null, [Validators.required, Validators.minLength(10)]],
    user: [],
    cidade: [],
  });

  constructor(
    protected pessoaService: PessoaService,
    protected userService: UserService,
    protected cidadeService: CidadeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);

      this.loadRelationshipsOptions();
      this.nomeUser=pessoa.user.firstName;
      this.nomeCidade=pessoa.cidade.nomeCidade;
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoa = this.createFromForm();
    if (pessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  trackUserById(_index: number, item: IUser): number {
    return item.id!;
  }

  trackCidadeById(_index: number, item: ICidade): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>): void {
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

  protected updateForm(pessoa: IPessoa): void {
    this.editForm.patchValue({
      id: pessoa.id,
      cpf: pessoa.cpf,
      dataNascimento: pessoa.dataNascimento,
      telefone: pessoa.telefone,
      rua: pessoa.rua,
      numero: pessoa.numero,
      bairro: pessoa.bairro,
      cep: pessoa.cep,
      user: pessoa.user,
      cidade: pessoa.cidade,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, pessoa.user);
    this.cidadesSharedCollection = this.cidadeService.addCidadeToCollectionIfMissing(this.cidadesSharedCollection, pessoa.cidade);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.cidadeService
      .query()
      .pipe(map((res: HttpResponse<ICidade[]>) => res.body ?? []))
      .pipe(map((cidades: ICidade[]) => this.cidadeService.addCidadeToCollectionIfMissing(cidades, this.editForm.get('cidade')!.value)))
      .subscribe((cidades: ICidade[]) => (this.cidadesSharedCollection = cidades));
  }

  protected createFromForm(): IPessoa {
    return {
      ...new Pessoa(),
      id: this.editForm.get(['id'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
      dataNascimento: this.editForm.get(['dataNascimento'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      rua: this.editForm.get(['rua'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      bairro: this.editForm.get(['bairro'])!.value,
      cep: this.editForm.get(['cep'])!.value,
      user: this.editForm.get(['user'])!.value,
      cidade: this.editForm.get(['cidade'])!.value,
    };
  }
}
