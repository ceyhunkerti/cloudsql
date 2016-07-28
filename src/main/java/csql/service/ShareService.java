package csql.service;

import csql.model.Share;
import csql.model.User;
import csql.model.util.TreeNode;

import java.io.FileNotFoundException;
import java.util.Collection;
import java.util.List;

public interface ShareService {

    public Share share(String owner, String path, List<String> guestList) throws FileNotFoundException;

    public void removeShare(String owner, String path);

    public TreeNode getSharedByOthers(String guest);

    public TreeNode getSharedByOwner(String owner);

    public List<User> getGuests(String owner, String path);

    public Collection<Share> getSharesInList(List<String> pathList);
}
