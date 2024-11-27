package org.galaxy.backend.Repository;

import org.galaxy.backend.Model.Permission.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Roles, String> {

    Optional<Roles> findByName(String name);

}
