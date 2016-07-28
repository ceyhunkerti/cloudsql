package csql.service;

import csql.model.Share;
import csql.model.SharePK;
import csql.model.User;
import csql.repository.ShareRepository;
import csql.repository.UserRepository;
import csql.util.DirectoryWalker;
import csql.util.Toolbox;
import csql.model.util.TreeNode;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ShareServiceImpl implements ShareService {


    private ShareRepository shareRepository;
    private UserRepository  userRepository;

    @Value("${fs.usrRoot}")
    private String fsUsrRoot;

    public ShareServiceImpl() {

    }

    @Autowired
    public ShareServiceImpl(ShareRepository shareRepository,UserRepository userRepository) {
        this.shareRepository = shareRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Share share(String owner, String path, List<String> guestList) throws FileNotFoundException {

        guestList = new ArrayList(new HashSet(guestList));

        String guests = "";
        String absPath = Toolbox.getAbsPath(fsUsrRoot, path);

        if(!Files.exists(Paths.get(absPath))) {
            throw new FileNotFoundException("File not found " + path);
        }

        for(String guest : guestList){
            if(!guestExistInUpperDirectory(owner,guest,path))
                guests += (guest + " ");
        }

        guests = guests.trim();

        if(guests.length()>0) {
            return shareRepository.save(new Share(owner,path,guests));
        }

        return null;
    }

    private boolean guestExistInUpperDirectory(String owner,String guest,String path) {
        Collection<Share> shares = this.shareRepository.findByOwner(owner);

        for(Share share : shares) {
            return path.contains(share.getPath()+"/");
        }
        return false;
    }


    @Override
    public void removeShare(String owner, String path) {
        shareRepository.delete(new SharePK(owner,path));
    }

    @Override
    public TreeNode getSharedByOwner(String owner) {
        TreeNode shareRoot;

        Collection<Share> shares = shareRepository.findByOwner(owner);

        if(shares == null || shares.size() == 0) return null;

        shareRoot = new TreeNode("root");

        for(Share s : shares) {
            TreeNode node = (new DirectoryWalker(this.fsUsrRoot)).walk(Toolbox.getAbsPath(fsUsrRoot,s.getPath()));
            shareRoot.addChild(node);
        }

        return shareRoot;
    }

    @Override
    public List<User> getGuests(String owner, String path) {


        List<User> guests= new ArrayList<>();
        Share share = shareRepository.findOne(new SharePK(owner, path));

        if(share ==null || StringUtils.isEmpty(share.getGuests())) {
            return null;
        }

        for(String username : share.getGuests().split(" ")) {
            guests.add(userRepository.findByUsername(username));
        }

        return guests;
    }


    @Override
    public TreeNode getSharedByOthers(String guest) {

        TreeNode shareRoot;
        Collection<Share> allShare = shareRepository.findAll();
        List<Share> shared = new ArrayList<>();

        for(Share share : allShare) {
            if(share.getGuestList().contains(guest)) {
                shared.add(share);
            }
        }

        if(shared.size()==0) return null;

        shareRoot = new TreeNode("root");

        HashMap<String,TreeNode> shareMap = new HashMap<>();

        for(Share s : shared) {
            TreeNode root;
            if(shareMap.containsKey(s.getOwner())) {
                root = shareMap.get(s.getOwner());
            }
            else {
                root = new TreeNode(s.getOwner());
            }
            TreeNode node =
                    (new DirectoryWalker(this.fsUsrRoot)).walk(
                            Toolbox.getAbsPath(fsUsrRoot, s.getPath()));
            node = addShareInfo(node, s);
            root.addChild(node); 
            shareMap.put(s.getOwner(), root);
        }

        for(String key : shareMap.keySet()) {
            shareRoot.addChild(shareMap.get(key));
        }

        return shareRoot;
    }

    private TreeNode addShareInfo(TreeNode node, Share share) {

        HashMap<String, Object> data = (HashMap<String, Object>) node.getData();
        data.put("owner",share.getOwner());
        data.put("ownerName",userRepository.findByUsername(share.getOwner()).getName());

        if(!node.hasChildren()) return node;

        for(TreeNode n : node.getChildren()) {
            addShareInfo(n, share);
        }
        return node;
    }

    @Override
    public Collection<Share> getSharesInList(List<String> pathList) {
        Collection<Share> shared = shareRepository.findAll();
        Collection<Share> shares = new ArrayList<>();

        DirectoryWalker directoryWalker = new DirectoryWalker();

        for(Share share : shared){
            String path = Toolbox.getAbsPath(fsUsrRoot,share.getPath());
            List<String> sharedPaths = directoryWalker.getFlatPaths(path);
            Collection<String> intersect = CollectionUtils.intersection(pathList,sharedPaths);

            if(intersect.size() > 0){
                shares.add(share);
            }
        }

        return shares;

    }



    private boolean isDirectory(String path) {
        return Files.isDirectory(Paths.get(path));
    }

    private boolean isDirectory(Share share) {
        return this.isDirectory(share.getPath());
    }


}
