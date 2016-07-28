package csql.service;

import csql.exception.InvalidValueException;
import csql.model.MailServer;
import csql.model.Share;
import csql.model.User;
import csql.repository.UserRepository;
import csql.util.AppMail;
import csql.util.security.Crypto;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {


    private UserRepository userRepository;

    @Autowired
    private MailServerService mailServerService;

    public UserServiceImpl() {
    }

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Collection<User> getAll() {
        return this.userRepository.findAll();
    }

    @Override
    public User update(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User changePassword(String username, String password, String newPassword) throws RuntimeException{

        User me = this.userRepository.findByUsername(username);

        if(!Crypto.decrypt(me.getPassword()).equals(password)){
            throw new RuntimeException("Current password failure!");
        }
        if(StringUtils.isEmpty(newPassword)){
            throw new RuntimeException("Password can not be empty");
        }
        me.setPassword(Crypto.encrypt(newPassword));
        return userRepository.save(me);
    }

    @Override
    public User create(User user) {
        if(!StringUtils.isAlphanumeric(user.getUsername())) {
            throw new InvalidValueException("Username can only contain alphanumeric characters.");
        }

        String password = RandomStringUtils.randomAlphanumeric(7);
        user.setPassword(Crypto.encrypt(password));

        User newUser = this.userRepository.save(user);
        MailServer mailServer = mailServerService.findOne();
        if(mailServer!=null && mailServer.isActive()){
            AppMail.send(mailServer, newUser.getEmail(), "cloudsql password", Crypto.decrypt(newUser.getPassword()));
        }

        return newUser;
    }

    @Override
    public void delete(String username) {
        this.userRepository.delete(username);
    }

    @Override
    public Share share(String path, List<User> userList) {
        return null;
    }

    @Override
    public Share unShare(String path, List<User> userList) {
        return null;
    }

    @Override
    public Share stopShare(String path) {
        return null;
    }

    @Override
    public User updateOptions(String username, String options) {
        this.userRepository.updateUserOptions(username,options);
        return this.findByUsername(username);
    }
}
