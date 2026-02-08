package com.orbiqe.hrm.leave;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaveController {
    private final LeaveRepository repository;

    public LeaveController(LeaveRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Leave> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Leave create(@RequestBody Leave leave) {
        return repository.save(leave);
    }
}