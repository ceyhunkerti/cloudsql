package csql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import csql.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, String> {

    public User findByUsername(String name);

    @Transactional
    @Modifying
    @Query("update User u set u.options = :options where u.username = :username")
    public void updateUserOptions(@Param("username") String username, @Param("options")String options);
}
