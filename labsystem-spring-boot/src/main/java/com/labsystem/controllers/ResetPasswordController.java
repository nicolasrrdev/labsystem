package com.labsystem.controllers;
import com.labsystem.models.User;
import com.labsystem.repository.UserRepository;
import com.labsystem.security.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.HashMap;

@RestController
@RequestMapping("/reset-password")
public class ResetPasswordController {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private EmailService emailService;

  @Value("${reset.link.base.url}")
  private String resetLinkBaseUrl;
  @PostMapping("/request")
  public ResponseEntity<?> requestResetPassword(@RequestBody Map<String, String> request) throws MessagingException, jakarta.mail.MessagingException {
    String email = request.get("email");
    if (email != null) {
      Optional<User> userOptional = userRepository.findByEmail(email);
      if (userOptional.isPresent()) {
        User user = userOptional.get();
        String resetToken = UUID.randomUUID().toString();
        // 10 segs
        // Date expirationDate = new Date(System.currentTimeMillis() + 10 * 1000);
        // 1 min
        Date expirationDate = new Date(System.currentTimeMillis() + 60 * 1000);
        // 10 min
        // Date expirationDate = new Date(System.currentTimeMillis() + 600000);
        user.setResetToken(resetToken);
        user.setResetTokenExpiration(expirationDate);
        userRepository.save(user);
        String resetLink = resetLinkBaseUrl + "/reset-password?token=" + resetToken;
        emailService.sendResetPasswordEmail(user.getEmail(), resetLink);
        Map<String, String> responseJson = new HashMap<>();

        //responseJson.put("token", resetToken);

        responseJson.put("message", "ok");

        return ResponseEntity.ok(responseJson);
      } else {
        Map<String, String> errorJson = new HashMap<>();
        errorJson.put("error", "El correo no se encuentra registrado");
        return ResponseEntity.badRequest().body(errorJson);
      }
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping("/confirm")
  public ResponseEntity<?> confirmResetPassword(@RequestBody Map<String, String> request) {
    String token = request.get("token");
    String newPassword = request.get("newPassword");
    if (token == null && newPassword == null) {
      Map<String, String> errorJson = new HashMap<>();
      errorJson.put("error", "El token y la contraseña no han sido proporcionados");
      return ResponseEntity.badRequest().body(errorJson);
    } else if (token == null) {
      Map<String, String> errorJson = new HashMap<>();
      errorJson.put("error", "El token no ha sido proporcionado");
      return ResponseEntity.badRequest().body(errorJson);
    } else if (newPassword == null) {
      Map<String, String> errorJson = new HashMap<>();
      errorJson.put("error", "La contraseña no ha sido proporcionada");
      return ResponseEntity.badRequest().body(errorJson);
    }
    Optional<User> userOptional = userRepository.findByResetToken(token);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      if (user.getResetTokenExpiration().before(new Date())) {
        Map<String, String> errorJson = new HashMap<>();
        errorJson.put("error", "El token ha expirado");
        return ResponseEntity.badRequest().body(errorJson);
      }
      user.setPassword(passwordEncoder.encode(newPassword));
      user.setResetToken(null);
      user.setResetTokenExpiration(null);
      userRepository.save(user);
      Map<String, String> successJson = new HashMap<>();
      successJson.put("message", "La contraseña ha sido modificada con éxito");
      return ResponseEntity.ok(successJson);
    } else {
      Map<String, String> errorJson = new HashMap<>();
      errorJson.put("error", "El token no es válido");
      return ResponseEntity.badRequest().body(errorJson);
    }
  }

}