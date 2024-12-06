package com.mysite.demo1.User;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
//@Controller
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final UserSecurityServiceL userSecurityServiceL; // UserSecurityServiceL 인스턴스 선언

    private static final Logger logger = LoggerFactory.getLogger(UserController.class); // Logger 생성
    private final UserSecurityService userSecurityService;
    private final PasswordEncoder passwordEncoder;

    //내가 추가한 코드 3

    // JSON 요청을 처리하는 새로운 회원가입 메서드 추가
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup") // /api/signup으로 해논것(h2-console)
    //@ResponseBody
    public ResponseEntity<?> signup(@RequestBody UserCreateForm userCreateForm) {
        // 비밀번호 null 체크 및 비교
        logger.info("Received signup request: {}", userCreateForm);

        //UserCreateForm의 변수 이름과 UserCOntroller.java의 변수 이름과, signup.js의 변수 이름을 통일해야지 정상작동한다.
        String password = userCreateForm.getPassword();
        String confirmPassword = userCreateForm.getConfirmPassword();
        if (password == null || confirmPassword == null || !password.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body(Map.of("error", "2개의 비밀번호가 일치하지 않거나 유효하지 않습니다."));
        }

        try {
            userService.create(userCreateForm.getUsername(), userCreateForm.getEmail(), password);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "이미 등록된 사용자입니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "서버 내부 오류가 발생했습니다."));
        }

        return ResponseEntity.ok().body(Map.of("message", "회원가입 성공"));
    }

    //추가한 코드
    @GetMapping("/login")
    public ResponseEntity<?> getLoginInfo() {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(Map.of("error", "로그인은 POST 요청을 통해서만 가능합니다."));
    }

    //추가한 코드
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginForm userLoginForm) {
        logger.info("Received login request: {}", userLoginForm);


        try {
            CustomUserDetails userDetails = (CustomUserDetails) userSecurityServiceL.loadUserByEmail(userLoginForm.getEmail());
            if (passwordEncoder.matches(userLoginForm.getPassword(), userDetails.getPassword())) {
                // 로그인 성공, 사용자 이름과 이메일 제공
                return ResponseEntity.ok(Map.of("message", "로그인 성공", "username", userDetails.getUsername(), "email", userDetails.getEmail()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "잘못된 비밀번호입니다."));
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "사용자를 찾을 수 없습니다."));
        } catch (Exception e) {//예외 발생 코드 추가
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "서버 내부 오류가 발생했습니다."));
        }
    }


    @GetMapping("/h2-console") //그냥 get mapping 으로 하면 localhost 포트번호 8080으로 연결.
    public String h2ConsoleRedirect() {
        return "redirect:/h2-console";
    }
    //

    //비밀번호 변경
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> requestBody) {
        String username = requestBody.get("user");
        // JSON 데이터에서 현재 비밀번호와 새 비밀번호 추출
        String oldPassword = requestBody.get("currentPassword");
        String newPassword = requestBody.get("newPassword");
        System.out.println(username);
        System.out.println(oldPassword);
        System.out.println(newPassword);

        // 비밀번호 변경 처리
        if (username == null || oldPassword == null || newPassword == null) {
            return ResponseEntity.badRequest().body("요청 데이터가 올바르지 않습니다.");
        }

        try {
            userService.changePassword(username, oldPassword, newPassword);
            String message = "비밀번호가 성공적으로 변경되었습니다.";
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{\"message\":\"" + message + "\"}");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }

    // 현재 로그인된 사용자의 이메일을 가져오는 유틸리티 메서드
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No authenticated user found");
        }
        return authentication.getName();
    }
}

