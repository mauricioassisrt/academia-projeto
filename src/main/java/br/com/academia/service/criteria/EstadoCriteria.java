package br.com.academia.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link br.com.academia.domain.Estado} entity. This class is used
 * in {@link br.com.academia.web.rest.EstadoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /estados?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class EstadoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nomeEstado;

    private StringFilter sigla;

    private Boolean distinct;

    public EstadoCriteria() {}

    public EstadoCriteria(EstadoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nomeEstado = other.nomeEstado == null ? null : other.nomeEstado.copy();
        this.sigla = other.sigla == null ? null : other.sigla.copy();
        this.distinct = other.distinct;
    }

    @Override
    public EstadoCriteria copy() {
        return new EstadoCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNomeEstado() {
        return nomeEstado;
    }

    public StringFilter nomeEstado() {
        if (nomeEstado == null) {
            nomeEstado = new StringFilter();
        }
        return nomeEstado;
    }

    public void setNomeEstado(StringFilter nomeEstado) {
        this.nomeEstado = nomeEstado;
    }

    public StringFilter getSigla() {
        return sigla;
    }

    public StringFilter sigla() {
        if (sigla == null) {
            sigla = new StringFilter();
        }
        return sigla;
    }

    public void setSigla(StringFilter sigla) {
        this.sigla = sigla;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EstadoCriteria that = (EstadoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nomeEstado, that.nomeEstado) &&
            Objects.equals(sigla, that.sigla) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nomeEstado, sigla, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EstadoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (nomeEstado != null ? "nomeEstado=" + nomeEstado + ", " : "") +
            (sigla != null ? "sigla=" + sigla + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
