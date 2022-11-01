package br.com.academia.service.impl;

import br.com.academia.domain.Pessoa;
import br.com.academia.repository.PessoaRepository;
import br.com.academia.service.PessoaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Pessoa}.
 */
@Service
@Transactional
public class PessoaServiceImpl implements PessoaService {

    private final Logger log = LoggerFactory.getLogger(PessoaServiceImpl.class);

    private final PessoaRepository pessoaRepository;

    public PessoaServiceImpl(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    @Override
    public Pessoa save(Pessoa pessoa) {
        log.debug("Request to save Pessoa : {}", pessoa);
        return pessoaRepository.save(pessoa);
    }

    @Override
    public Pessoa update(Pessoa pessoa) {
        log.debug("Request to save Pessoa : {}", pessoa);
        return pessoaRepository.save(pessoa);
    }

    @Override
    public Optional<Pessoa> partialUpdate(Pessoa pessoa) {
        log.debug("Request to partially update Pessoa : {}", pessoa);

        return pessoaRepository
            .findById(pessoa.getId())
            .map(existingPessoa -> {
                if (pessoa.getCpf() != null) {
                    existingPessoa.setCpf(pessoa.getCpf());
                }
                if (pessoa.getDataNascimento() != null) {
                    existingPessoa.setDataNascimento(pessoa.getDataNascimento());
                }
                if (pessoa.getTelefone() != null) {
                    existingPessoa.setTelefone(pessoa.getTelefone());
                }
                if (pessoa.getRua() != null) {
                    existingPessoa.setRua(pessoa.getRua());
                }
                if (pessoa.getNumero() != null) {
                    existingPessoa.setNumero(pessoa.getNumero());
                }
                if (pessoa.getBairro() != null) {
                    existingPessoa.setBairro(pessoa.getBairro());
                }
                if (pessoa.getCep() != null) {
                    existingPessoa.setCep(pessoa.getCep());
                }

                return existingPessoa;
            })
            .map(pessoaRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Pessoa> findAll(Pageable pageable) {
        log.debug("Request to get all Pessoas");
        return pessoaRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Pessoa> findOne(Long id) {
        log.debug("Request to get Pessoa : {}", id);
        return pessoaRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pessoa : {}", id);
        pessoaRepository.deleteById(id);
    }

    @Override
    public boolean verificaPermissao() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        for (GrantedAuthority item : auth.getAuthorities()) {
            if (item.getAuthority().equals("ROLE_CLIENTE")) {
                return true;
            }
        }
        return false;
    }

}
