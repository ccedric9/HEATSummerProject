package com.best.heatBackEnd.controller;

//import com.best.heatBackEnd.exception.UserNotFoundException;
import com.best.heatBackEnd.exception.CalendarEventNotFoundException;
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

    @GetMapping("/calendarEvents/{id}")
    CalendarEvent getUser(@PathVariable Long id) {
        return calendarEventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Could not found the user with id "+ id));
    }
    @PutMapping("/calendarEvents/{id}")
    CalendarEvent updateUser(@RequestBody CalendarEvent newCalendarEvent, @PathVariable Long id){
        return calendarEventRepository.findById(id)
                .map(calendarEvent -> {
                    calendarEvent.setUnitName(newCalendarEvent.getUnitName());
                    calendarEvent.setUnitCode(newCalendarEvent.getUnitCode());
                    calendarEvent.setTerm(newCalendarEvent.getTerm());
                    calendarEvent.setAcademicYear(newCalendarEvent.getAcademicYear());
                    calendarEvent.setUnitCredit(newCalendarEvent.getUnitCredit());
                    calendarEvent.setWeight(newCalendarEvent.getWeight());
                    calendarEvent.setTitle(newCalendarEvent.getTitle());
                    calendarEvent.setEventType(newCalendarEvent.getEventType());
                    calendarEvent.setStartTime(newCalendarEvent.getStartTime());
                    calendarEvent.setEndTime(newCalendarEvent.getEndTime());
                    return calendarEventRepository.save(calendarEvent);
                })
                .orElseThrow(
                        () -> new CalendarEventNotFoundException(id)
                );

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
