package br.com.academia.service.impl;

import br.com.academia.domain.Estado;
import br.com.academia.repository.EstadoRepository;
import br.com.academia.service.EstadoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Estado}.
 */
@Service
@Transactional
public class EstadoServiceImpl implements EstadoService {

    private final Logger log = LoggerFactory.getLogger(EstadoServiceImpl.class);

    private final EstadoRepository estadoRepository;

    public EstadoServiceImpl(EstadoRepository estadoRepository) {
        this.estadoRepository = estadoRepository;
    }

    @Override
    public Estado save(Estado estado) {
        log.debug("Request to save Estado : {}", estado);
        return estadoRepository.save(estado);
    }

    @Override
    public Estado update(Estado estado) {
        log.debug("Request to save Estado : {}", estado);
        return estadoRepository.save(estado);
    }

    @Override
    public Optional<Estado> partialUpdate(Estado estado) {
        log.debug("Request to partially update Estado : {}", estado);

        return estadoRepository
            .findById(estado.getId())
            .map(existingEstado -> {
                if (estado.getNomeEstado() != null) {
                    existingEstado.setNomeEstado(estado.getNomeEstado());
                }
                if (estado.getSigla() != null) {
                    existingEstado.setSigla(estado.getSigla());
                }

                return existingEstado;
            })
            .map(estadoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Estado> findAll(Pageable pageable) {
        log.debug("Request to get all Estados");
        return estadoRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Estado> findOne(Long id) {
        log.debug("Request to get Estado : {}", id);
        return estadoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Estado : {}", id);
        estadoRepository.deleteById(id);
    }
}
