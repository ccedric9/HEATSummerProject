package com.best.heatBackEnd.controller;

//import com.best.heatBackEnd.exception.UserNotFoundException;
import com.best.heatBackEnd.model.CalendarEvent;
import com.best.heatBackEnd.repository.CalendarEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CalendarEventController {

    @Autowired
    private CalendarEventRepository calendarEventRepository;

    @PostMapping("/calendarEvents")
    CalendarEvent newUser(@RequestBody CalendarEvent newCalendarEvent) {
        return calendarEventRepository.save(newCalendarEvent);
    }

    @GetMapping("/calendarEvents")
    List<CalendarEvent> getAllUsers() {
        return calendarEventRepository.findAll();
    }
    @DeleteMapping("/calendarEvents/{id}")
    String deleteUser(@PathVariable Long id){
        if(!calendarEventRepository.existsById(id)){
            throw new RuntimeException("Could not found the user with id "+ id);
        }
        calendarEventRepository.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }



}
