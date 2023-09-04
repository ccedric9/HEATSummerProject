package com.best.heatBackEnd;

import com.best.heatBackEnd.controller.CalendarEventController;
import com.best.heatBackEnd.model.CalendarEvent;
import com.best.heatBackEnd.repository.CalendarEventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CalendarEventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CalendarEventController calendarEventController;

    @MockBean
    private CalendarEventRepository calendarEventRepository;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(calendarEventController).build();
    }

    @Test
    public void testAddNewCalendarEvent() throws Exception {
        CalendarEvent event = new CalendarEvent();
        event.setProgramName("TestProgram");

        given(calendarEventRepository.save(event)).willReturn(event);

        mockMvc.perform(post("/calendarEvents")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"programName\":\"TestProgram\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllCalendarEvents() throws Exception {
        CalendarEvent event = new CalendarEvent();
        event.setProgramName("TestProgram");

        given(calendarEventRepository.findAll()).willReturn(Arrays.asList(event));

        mockMvc.perform(get("/calendarEvents"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{'programName':'TestProgram'}]"));
    }

    @Test
    public void testGetCalendarEventById() throws Exception {
        CalendarEvent event = new CalendarEvent();
        event.setId(1L);
        event.setProgramName("TestProgram");

        given(calendarEventRepository.findById(1L)).willReturn(Optional.of(event));

        mockMvc.perform(get("/calendarEvents/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("{'id':1,'programName':'TestProgram'}"));
    }

    @Test
    public void testUpdateCalendarEvent() throws Exception {
        CalendarEvent event = new CalendarEvent();
        event.setId(1L);
        event.setProgramName("TestProgram");

        given(calendarEventRepository.findById(1L)).willReturn(Optional.of(event));
        given(calendarEventRepository.save(event)).willReturn(event);

        mockMvc.perform(put("/calendarEvents/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"programName\":\"UpdatedProgram\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteCalendarEvent() throws Exception {
        given(calendarEventRepository.existsById(1L)).willReturn(true);

        mockMvc.perform(delete("/calendarEvents/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("User with id 1 has been deleted success."));
    }
}
