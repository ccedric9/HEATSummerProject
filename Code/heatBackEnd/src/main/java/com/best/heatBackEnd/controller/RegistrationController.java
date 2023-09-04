package com.best.heatBackEnd.controller;


import com.best.heatBackEnd.registration.RegistrationRequest;
import com.best.heatBackEnd.registration.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration")
@CrossOrigin(origins = {"http://localhost:3000", "http://assessmentcalendar.s3-website.eu-west-2.amazonaws.com"})
@AllArgsConstructor

public class RegistrationController {
    private final RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request){
        return registrationService.register(request);
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
