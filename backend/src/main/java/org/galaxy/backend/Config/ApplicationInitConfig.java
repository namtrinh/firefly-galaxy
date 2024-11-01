package org.galaxy.backend.Config;

import java.util.HashSet;

import org.galaxy.backend.Model.Permission.PredefinedRole;
import org.galaxy.backend.Model.Permission.Roles;
import org.galaxy.backend.Model.User;
import org.galaxy.backend.Repository.RoleRepository;
import org.galaxy.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class ApplicationInitConfig {
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    // khởi chạy cùng hệ thống
    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByEmail("nthanhhai219@gmail.com").isEmpty()) {

                Roles adminRole = roleRepository.save(Roles.builder()
                        .name(PredefinedRole.ADMIN_ROLE)
                        .description("Admin role")
                        .build());

                var roles = new HashSet<Roles>();
                roles.add(adminRole);

                User user = User.builder()
                        .email("nthanhhai219@gmail.com")
                        .password(passwordEncoder.encode("12345678"))
                        .roles(roles)
                        .build();

                userRepository.save(user);
                log.warn("account admin has been created, please change it");
            }
        };
    }
}
// th 401: không được xử lí vì error xảy ra trên filter trước khi vào các service nên
// nên để bắt được thì cấu hình khác
