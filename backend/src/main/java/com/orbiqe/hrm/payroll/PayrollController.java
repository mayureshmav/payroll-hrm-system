package com.orbiqe.hrm.payroll;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend
public class PayrollController {

    private final PayrollRepository repository;

    public PayrollController(PayrollRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Payroll> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Payroll create(@RequestBody Payroll payroll) {
        return repository.save(payroll);
    }
}