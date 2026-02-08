package com.orbiqe.hrm.attendance;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    private final AttendanceRepository repository;

    public AttendanceController(AttendanceRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Attendance> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Attendance create(@RequestBody Attendance attendance) {
        return repository.save(attendance);
    }
}