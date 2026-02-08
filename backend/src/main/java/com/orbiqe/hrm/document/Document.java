package com.orbiqe.hrm.document;

import jakarta.persistence.*;

@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeName;
    private String title;
    private String filePath; // store path or URL

    // getters and setters
}