package csql.service;

import csql.model.Share;
import csql.model.User;

import java.util.Collection;
import java.util.List;

public interface UserService {

    public User findByUsername(String username) ;

    public Collection<User> getAll();

    public User update(User user);

    User changePassword(String username, String password, String newPassword) throws RuntimeException;

    public User create(User user);

    public void delete(String username);

    public Share share (String path, List<User> userList);

    public Share unShare (String path, List<User> userList);

    public Share stopShare(String path);

    public User updateOptions(String username, String options);
}
