package com.labsystem.repositories;
import com.labsystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findByResetToken(String token);

    @Query("SELECT u.id, u.email, r.id FROM User u JOIN u.roles r")
    List<Object[]> findAllUserIdAndEmailWithRoleId();

}
