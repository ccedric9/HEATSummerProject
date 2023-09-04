package com.best.heatBackEnd.registration;


import com.best.heatBackEnd.appuser.AppUser;
import com.best.heatBackEnd.appuser.AppUserRole;
import com.best.heatBackEnd.appuser.AppUserService;
import com.best.heatBackEnd.email.EmailSender;
import com.best.heatBackEnd.registration.token.ConfirmationToken;
import com.best.heatBackEnd.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.
                test(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        String token = appUserService.signUpUser(
                new AppUser(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        request.getMajor(),
                        request.getStaff(),
                        request.getCourses(),
                        request.getEntryYear(),
                        AppUserRole.USER
                )
        );
        //todo: change link when hosting
        String link = "http://localhost:8080/api/v1/registration/confirm?token=" + token;
        emailSender.send(
                request.getEmail(),
                buildEmail(request.getFirstName(), link));

        return token;
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        appUserService.enableAppUser(
                confirmationToken.getAppUser().getEmail());
        return "confirmed";
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Arial,sans-serif;font-size:16px;margin:0;color:#333\">" +
                "<h2 style=\"color:#4caf50;text-align:center;\">Welcome to Our Service!</h2>" +
                "<p style=\"text-align:center;\">Hi " + name + ",</p>" +
                "<p style=\"text-align:center;\">Thanks for registering with us. Please click the button below to activate your account:</p>" +
                "<div style=\"text-align:center;margin:20px;\">" +
                "<a href=\"" + link + "\" style=\"font-size:16px; text-decoration:none; color:#fff; background-color:#4caf50; padding:10px 20px; border-radius:5px;\">Activate Now</a>" +
                "</div>" +
                "<p style=\"text-align:center;\">Note: The activation link will expire in 15 minutes.</p>" +
                "<p style=\"text-align:center;\">See you soon!</p>" +
                "</div>";
    }

}