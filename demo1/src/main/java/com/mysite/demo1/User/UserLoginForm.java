package com.mysite.demo1.User;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserLoginForm {
    @NotNull
    @NotEmpty(message = "Username은 비어 있을 수 없습니다.")
    private String email;
    @NotNull
    @NotEmpty
    private String username; // 사용자 이름 (또는 이메일 등)
    @NotNull
    @NotEmpty(message = "Password는 비어 있을 수 없습니다.")
    private String password; // 비밀번호
}


