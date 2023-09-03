package com.best.heatBackEnd.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Entity;
import javax.persistence.Table;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Table(name = "calendar_event_backup")
public class CalendarEvent {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "program_name")
    @JsonProperty("programName")
    private String programName;

    @Column(name = "unit_name")
    @JsonProperty("unitName")
    private String unitName;

    @Column(name = "unit_code")
    @JsonProperty("unitCode")
    private String unitCode;

    @Column(name = "unit_credit_points")
    @JsonProperty("unitCredit")
    private int unitCredit;

    @Column(name = "term")
    @JsonProperty("term")
    private int term;

    @Column(name = "year")
    @JsonProperty("academicYear")
    private int academicYear;

    @Column(name = "weight")
    @JsonProperty("weight")
    private int weight;

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




    @Column(name = "summary", columnDefinition="TEXT")
    @JsonProperty("summary")
    private String summary;
    @Column(name = "feedback", columnDefinition="TEXT")
    @JsonProperty("feedback")
    private String feedback;

    @Column(name = "location")
    @JsonProperty("location")
    private String location;

    @Column(name = "examTime")
    @JsonProperty("examTime")
    private String examTime;


    @Column(name = "linkedIds")
    @JsonProperty("linkedIds")
    private String linkedIds;





    public String getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public int getUnitCredit() {
        return unitCredit;
    }

    public void setUnitCredit(int unitCredit) {
        this.unitCredit = unitCredit;
    }

    public int getTerm() {
        return term;
    }

    public void setTerm(int term) {
        this.term = term;
    }

    public int getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(int academicYear) {
        this.academicYear = academicYear;
    }

    public String getProgramName() {
        return programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

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

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
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

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getExamTime() {
        return examTime;
    }

    public void setExamTime(String examTime) {
        this.examTime = examTime;
    }

    public String getLinkedIds() {
        return linkedIds;
    }

    public void setLinkedIds(String linkedIds) {
        this.linkedIds = linkedIds;
    }
}
