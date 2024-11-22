package com.mysite.demo1;

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

}

//user 서비스에는 User 리포지터리를 사용하여
// 회원 데이터를 생성하는 create메서드를 추가했다.
// 이 때 User의 비밀번호는 보안을 위해 위 코드를 추ㅏ.
//그러므로 스프링 시큐리티의 특정 클래스를 사용하여 암호화하여 비밀번호를 저장했다.