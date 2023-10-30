///*

package com.labsystem.controllers;
import com.labsystem.models.User;
import com.labsystem.repository.UserRepository;
import com.labsystem.security.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/reset-password")
public class ResetPasswordController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;

    @GetMapping("/request")
    public ResponseEntity<?> requestResetPassword(@RequestParam String email) throws MessagingException, jakarta.mail.MessagingException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String resetToken = UUID.randomUUID().toString();
            Date expirationDate = new Date(System.currentTimeMillis() + 60 * 1000);
            user.setResetToken(resetToken);
            user.setResetTokenExpiration(expirationDate);
            userRepository.save(user);
            String resetLink = "http://localhost:5173/reset-password?token=" + resetToken;
            emailService.sendResetPasswordEmail(user.getEmail(), resetLink);
            return ResponseEntity.ok("Se ha enviado un enlace de restablecimiento de contraseña a su correo electrónico.");
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmResetPassword(@RequestParam String token, @RequestParam String newPassword) {
        Optional<User> userOptional = userRepository.findByResetToken(token);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getResetTokenExpiration().before(new Date())) {
                return ResponseEntity.badRequest().build();
            }
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            user.setResetTokenExpiration(null);
            userRepository.save(user);
            return ResponseEntity.ok("La contraseña se ha restablecido con éxito.");
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}

//*/