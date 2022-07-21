package br.com.academia.repository;

import br.com.academia.domain.Cidade;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Cidade entity.
 */
@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long> {
    @Query("select cidade from Cidade cidade where cidade.user.login = ?#{principal.username}")
    List<Cidade> findByUserIsCurrentUser();

    default Optional<Cidade> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Cidade> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Cidade> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct cidade from Cidade cidade left join fetch cidade.estado left join fetch cidade.user",
        countQuery = "select count(distinct cidade) from Cidade cidade"
    )
    Page<Cidade> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct cidade from Cidade cidade left join fetch cidade.estado left join fetch cidade.user")
    List<Cidade> findAllWithToOneRelationships();

    @Query("select cidade from Cidade cidade left join fetch cidade.estado left join fetch cidade.user where cidade.id =:id")
    Optional<Cidade> findOneWithToOneRelationships(@Param("id") Long id);
}
