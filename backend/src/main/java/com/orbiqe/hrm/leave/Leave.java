package com.orbiqe.hrm.leave;

import jakarta.persistence.*;

@Entity
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String employeeName;
    private String startDate;
    private String endDate;
    private String reason;

    // getters and setters
}