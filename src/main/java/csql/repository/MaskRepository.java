package csql.repository;

import csql.model.Mask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MaskRepository extends JpaRepository<Mask, Integer> {


    @Query("select m from Mask m left outer join fetch m.connectionDetail c")
    public List<Mask> findAllMasks();

    @Query("select m from Mask m join fetch m.connectionDetail c " +
            "where c is null or c.id = :connectionId")
    public List<Mask> findAllMasksByConnectionId(@Param("connectionId") Integer connectionId);

    @Query("select m from Mask m join fetch m.connectionDetail c " +
            "where (c is null or c.id = :connectionId) and m.active=true")
    public List<Mask> findMasksByConnectionId(@Param("connectionId") Integer connectionId);

}
