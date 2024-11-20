package com.mysite.demo1;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserSecurityServiceL implements UserDetailsService {

    private final UserRepository userRepository; // 사용자 저장소

    public UserSecurityServiceL(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        SiteUser siteUser = userRepository.findByemail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));

        // CustomUserDetails 객체로 반환
        return new CustomUserDetails(siteUser);
    }



    // 이메일을 기반으로 사용자 정보 로드 (로그인이 username을 받아오지 못하는 코드)
//    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
//        SiteUser siteUser = userRepository.findByemail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));
//
//        // Spring Security의 UserDetails 객체로 변환
//        return User.builder()
//                .username(siteUser.getEmail()) // 이메일을 사용자 이름으로 사용
//                .password(siteUser.getPassword()) // 암호화된 비밀번호
////                .roles(siteUser.getRoles() != null ? siteUser.getRoles().toArray(new String[0]) : new String[]{}) // 사용자 역할이 있을 경우 변환
//                .build();
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 사용자 조회 로직 (예시로 사용자 찾기)
        SiteUser siteUser = userRepository.findByusername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username));

        // Spring Security의 UserDetails 객체로 변환
        return User.builder()
                .username(siteUser.getUsername())
                .password(siteUser.getPassword()) // 암호화된 비밀번호
//                .roles(siteUser.getRoles().toArray(new String[0])) // 사용자 역할
                .build();
    }
}
