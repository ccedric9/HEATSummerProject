package com.best.heatBackEnd;

import com.best.heatBackEnd.registration.RegistrationRequest;
import com.best.heatBackEnd.registration.RegistrationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class RegistrationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RegistrationService registrationService;

    @Test
    public void testRegister() throws Exception {
        RegistrationRequest request = new RegistrationRequest(
                "John",
                "Doe",
                "johndoe@example.com",
                "password123",
                "Computer Science",
                false,
                Arrays.asList("Course1", "Course2"),
                "2023"
        );

        Mockito.when(registrationService.register(Mockito.any())).thenReturn("User registered successfully");

        mockMvc.perform(post("/api/v1/registration")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    public void testConfirm() throws Exception {
        String token = "someToken";
        Mockito.when(registrationService.confirmToken(token)).thenReturn("User confirmed successfully");

        mockMvc.perform(get("/api/v1/registration/confirm")
                        .param("token", token))
                .andExpect(status().isOk());
    }
}
