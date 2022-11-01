package br.com.academia.service;

import br.com.academia.domain.Pessoa;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Pessoa}.
 */
public interface PessoaService {
    /**
     * Save a pessoa.
     *
     * @param pessoa the entity to save.
     * @return the persisted entity.
     */
    Pessoa save(Pessoa pessoa);

    /**
     * Updates a pessoa.
     *
     * @param pessoa the entity to update.
     * @return the persisted entity.
     */
    Pessoa update(Pessoa pessoa);

    /**
     * Partially updates a pessoa.
     *
     * @param pessoa the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Pessoa> partialUpdate(Pessoa pessoa);

    /**
     * Get all the pessoas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Pessoa> findAll(Pageable pageable);

    /**
     * Get all the pessoas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Pessoa> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" pessoa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Pessoa> findOne(Long id);

    /**
     * Delete the "id" pessoa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     *  Metodo ele retorna o tipo da permissão cliente
     * @return
     */
    boolean verificaPermissao();
}
