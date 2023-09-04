


package com.best.heatBackEnd.exception;

public class CalendarEventNotFoundException extends RuntimeException{
    public CalendarEventNotFoundException(Long id){
        super("Could not found the user with id "+ id);
    }
}