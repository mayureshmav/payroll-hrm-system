package com.orbiqe.hrm.common;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @PostMapping("/login")
    public boolean login(@RequestBody LoginRequest request) {
        // For demo: hardcoded user
        return "admin".equals(request.getUsername()) && "password".equals(request.getPassword());
    }

    // Inner class for login request
    static class LoginRequest {
        private String username;
        private String password;

        // Getters
        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        // Setters
        public void setUsername(String username) {
            this.username = username;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}