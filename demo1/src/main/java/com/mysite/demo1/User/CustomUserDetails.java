package com.mysite.demo1.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;


//사용자 로그인 시 결과값을 객체로 받기 위해서 사용.
public class CustomUserDetails implements UserDetails {
    private String username;
    private String email;
    private String password;
    private List<GrantedAuthority> authorities;

    public CustomUserDetails(SiteUser siteUser) {
        this.username = siteUser.getUsername(); // 실제 사용자 이름
        this.email = siteUser.getEmail(); // 이메일
        this.password = siteUser.getPassword(); // 암호화된 비밀번호
        this.authorities = Collections.emptyList(); // 권한 (필요에 따라 설정)
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
