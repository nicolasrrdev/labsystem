package com.labsystem.controllers;
import com.labsystem.models.User;
import com.labsystem.repositories.UserRepository;
import com.labsystem.models.Role;
import com.labsystem.repositories.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    @PutMapping("/{userId}/roles/{roleId}")
    public ResponseEntity<?> updateUserRole(@PathVariable Long userId, @PathVariable Long roleId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Role> roleOptional = roleRepository.findById(roleId);
        if (userOptional.isPresent() && roleOptional.isPresent()) {
            User user = userOptional.get();
            Role role = roleOptional.get();
            user.getRoles().clear();
            user.getRoles().add(role);
            userRepository.save(user);
            return ResponseEntity.ok("Rol actualizado exitosamente");
        } else {
            return ResponseEntity.badRequest().body("Usuario o rol no encontrados");
        }
    }

}
