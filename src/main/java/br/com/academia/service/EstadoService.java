package br.com.academia.service;

import br.com.academia.domain.Estado;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Estado}.
 */
public interface EstadoService {
    /**
     * Save a estado.
     *
     * @param estado the entity to save.
     * @return the persisted entity.
     */
    Estado save(Estado estado);

    /**
     * Updates a estado.
     *
     * @param estado the entity to update.
     * @return the persisted entity.
     */
    Estado update(Estado estado);

    /**
     * Partially updates a estado.
     *
     * @param estado the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Estado> partialUpdate(Estado estado);

    /**
     * Get all the estados.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Estado> findAll(Pageable pageable);

    /**
     * Get the "id" estado.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Estado> findOne(Long id);

    /**
     * Delete the "id" estado.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
