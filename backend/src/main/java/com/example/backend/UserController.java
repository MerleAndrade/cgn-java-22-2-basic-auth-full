package com.example.backend;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("api/users")
public class UserController {

@GetMapping("login")
    String login() {
    return getUsername();
}

    @GetMapping("me")
    String getUsername() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("logout")
    void logout(HttpSession session) {
        session.invalidate();
    }

}
