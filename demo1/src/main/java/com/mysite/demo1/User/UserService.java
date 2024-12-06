package com.mysite.demo1.User;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public SiteUser create(String username, String email, String password){
        SiteUser user = new SiteUser();
        user.setUsername(username);
        user.setEmail(email);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); //비밀번호를 암호화하기 위해서 필요
        user.setPassword(passwordEncoder.encode(password));
        this.userRepository.save(user);
        return user;
    }

    public void save(SiteUser user) {
        userRepository.save(user);
    }

    //비밀번호 변경
    public void changePassword(String username, String currentPassword, String newPassword) {
        // username을 기반으로 사용자 찾기
        SiteUser user = userRepository.findByusername(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 현재 비밀번호 검증
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        // 새 비밀번호 암호화 및 업데이트
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}

//user 서비스에는 User 리포지터리를 사용하여
// 회원 데이터를 생성하는 create메서드를 추가했다.
// 이 때 User의 비밀번호는 보안을 위해 위 코드를 추가.
//그러므로 스프링 시큐리티의 특정 클래스를 사용하여 암호화하여 비밀번호를 저장했다.