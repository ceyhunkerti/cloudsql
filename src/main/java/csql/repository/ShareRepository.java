package csql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import csql.model.Share;
import csql.model.SharePK;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ShareRepository extends JpaRepository<Share, SharePK>  {

    @Query("SELECT t from Share t where owner =:owner")
    public Collection<Share> findByOwner(@Param("owner") String owner);

}
