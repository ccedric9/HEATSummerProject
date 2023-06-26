package com.best.heatBackEnd.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class CalendarEvent {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "unit_name")
    @JsonProperty("unitName")
    private String unitName;

    @Column(name = "weight")
    @JsonProperty("weight")
    private String weight;

    @Column(name = "title")
    @JsonProperty("title")
    private String title;


    @Column(name = "type")
    @JsonProperty("type")
    private String eventType;

    @Column(name = "start")
    @JsonProperty("start")
    private String startTime;

    @Column(name = "end")
    @JsonProperty("end")
    private String endTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
