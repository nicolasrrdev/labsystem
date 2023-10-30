///*

package com.labsystem.security.services;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;

@Service
public class EmailService {
    @Value("${spring.mail.username}")
    private String fromEmail;
    private final JavaMailSender javaMailSender;
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    public void sendResetPasswordEmail(String to, String resetLink) throws MessagingException, jakarta.mail.MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
        messageHelper.setFrom(fromEmail);
        messageHelper.setTo(to);
        messageHelper.setSubject("Restablecimiento de Contraseña");
        messageHelper.setText("Haga clic en el siguiente enlace para restablecer su contraseña: " + resetLink, true);
        javaMailSender.send(mimeMessage);
    }
}

//*/