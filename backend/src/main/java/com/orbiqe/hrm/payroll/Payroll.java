package com.orbiqe.hrm.payroll;

import jakarta.persistence.*;

@Entity
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeName;
    private Double salary;
    private String month;

    // getters and setters
}