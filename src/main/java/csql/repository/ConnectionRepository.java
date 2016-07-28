package csql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import csql.model.ConnectionDetail;

public interface ConnectionRepository extends JpaRepository<ConnectionDetail, Integer> {
    public ConnectionDetail findByName(String name);
}
