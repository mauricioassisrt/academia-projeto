package br.com.academia.repository;

import br.com.academia.domain.Pessoa;
import br.com.academia.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data SQL repository for the Pessoa entity.
 */
@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long>, JpaSpecificationExecutor<Pessoa> {
    Page<Pessoa> findByUser(User user, Pageable pageable);

    @Query("select pessoa from Pessoa pessoa where pessoa.user.login = ?#{principal.username}")
    List<Pessoa> findByUserIsCurrentUser();

    default Optional<Pessoa> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Pessoa> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Pessoa> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct pessoa from Pessoa pessoa left join fetch pessoa.user left join fetch pessoa.cidade",
        countQuery = "select count(distinct pessoa) from Pessoa pessoa"
    )
    Page<Pessoa> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct pessoa from Pessoa pessoa left join fetch pessoa.user left join fetch pessoa.cidade")
    List<Pessoa> findAllWithToOneRelationships();

    @Query("select pessoa from Pessoa pessoa left join fetch pessoa.user left join fetch pessoa.cidade where pessoa.id =:id")
    Optional<Pessoa> findOneWithToOneRelationships(@Param("id") Long id);
}
