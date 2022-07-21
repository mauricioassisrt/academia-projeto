import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstado, Estado } from '../estado.model';
import { EstadoService } from '../service/estado.service';

@Component({
  selector: 'jhi-estado-update',
  templateUrl: './estado-update.component.html',
})
export class EstadoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomeEstado: [null, [Validators.required, Validators.minLength(3)]],
    sigla: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
  });

  constructor(protected estadoService: EstadoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estado }) => {
      this.updateForm(estado);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estado = this.createFromForm();
    if (estado.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoService.update(estado));
    } else {
      this.subscribeToSaveResponse(this.estadoService.create(estado));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstado>>): void {
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

  protected updateForm(estado: IEstado): void {
    this.editForm.patchValue({
      id: estado.id,
      nomeEstado: estado.nomeEstado,
      sigla: estado.sigla,
    });
  }

  protected createFromForm(): IEstado {
    return {
      ...new Estado(),
      id: this.editForm.get(['id'])!.value,
      nomeEstado: this.editForm.get(['nomeEstado'])!.value,
      sigla: this.editForm.get(['sigla'])!.value,
    };
  }
}
