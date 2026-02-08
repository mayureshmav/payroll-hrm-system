package com.orbiqe.hrm.document;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:3000")
public class DocumentController {
    private final DocumentRepository repository;

    public DocumentController(DocumentRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Document> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Document create(@RequestBody Document document) {
        return repository.save(document);
    }
}