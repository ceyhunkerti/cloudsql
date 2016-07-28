package csql.service;

import csql.model.Share;
import csql.model.util.AppResponse;
import csql.model.util.ResponseCode;
import csql.repository.ShareRepository;
import csql.util.DirectoryWalker;
import csql.util.Toolbox;
import csql.model.util.TreeNode;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class FileSystemServiceImpl implements FileSystemService{

    @Value("${fs.usrRoot}")
    private String fsUsrRoot;

    @Value("${fs.archive}")
    private String fsArchive;

    private ShareRepository shareRepository;
    private ShareService shareService;


    public FileSystemServiceImpl () {

    }

    @Autowired
    public FileSystemServiceImpl (ShareRepository shareRepository, ShareService shareService) {
        this.shareRepository = shareRepository;
        this.shareService = shareService;
    }

    @Override
    public TreeNode getUserRoot(String username) {

        Collection<Share> shares = shareRepository.findByOwner(username);
        TreeNode node = (new DirectoryWalker(fsUsrRoot)).walk(fsUsrRoot + "/" + username);
        TreeNode root = new TreeNode("root");
        root.addChild(node);

        if(shares.size()>0) {
            return loadShareInfo(root,shares);
        }

        return root;
    }

    private TreeNode loadShareInfo(TreeNode node , Collection<Share> shares) {

        HashMap<String,Object> data = (HashMap<String, Object>) node.getData();

        if(data != null) {
            if(data.containsKey("path")) {
                String path = data.get("path").toString();
                Share share = getShareInfo(shares,path);
                data.put("share",share);
            }
        }

        if(node.hasChildren()) {
            for(TreeNode n : node.getChildren()) {
                loadShareInfo(n,shares);
            }
        }

        return node;
    }

    private Share getShareInfo(Collection<Share> shares, String path) {

        for(Share s : shares) {
            if(s.getPath().equals(path))
                return s;
        }

        return null;
    }


    @Override
    public String readFile(String relativePath) throws IOException{

        String path = Toolbox.getAbsPath(fsUsrRoot,relativePath);
        return read(path);
    }

    private String read(String path) throws IOException {
        byte[] encoded = Files.readAllBytes(Paths.get(path));
        return new String(encoded, StandardCharsets.UTF_8);
    }



    @Override
    public AppResponse delete(String relativePath, boolean force) {

        String path = Toolbox.getAbsPath(fsUsrRoot, relativePath);

        AppResponse response = new AppResponse();

        try {
            if(force) {
                this.deletePath(path);
                response.setSuccess(true);
                response.setResponseCode(ResponseCode.SUCCESS);
            } else {
                DirectoryWalker directoryWalker = new DirectoryWalker();
                List<String> flatPaths = directoryWalker.getFlatPaths(path);
                Collection<Share> shares = shareService.getSharesInList(flatPaths);
                if(shares.size() == 0) {
                    this.deletePath(path);
                    response.setSuccess(true);
                    response.setResponseCode(ResponseCode.SUCCESS);
                    response.setMessage("Deleted " + relativePath);
                } else {
                    response.setSuccess(false);
                    response.setMessage("Shares available");
                    response.setResponseCode(ResponseCode.VALIDATE);
                }
            }
        } catch (IOException e){
            response.setSuccess(false);
            response.setMessage(e.getMessage());
        }


        return response;
    }


    private void deletePath(String path) throws IOException {
        if(Files.isDirectory(Paths.get(path))) {
            FileUtils.deleteDirectory(new File(path));
        } else {
            Files.deleteIfExists(Paths.get(path));
        }
    }


    @Override
    public AppResponse createFile(String relativePath) throws IOException, RuntimeException {
        AppResponse response = new AppResponse();
        String path = Toolbox.getAbsPath(fsUsrRoot,relativePath);
        Path p = Files.createFile(Paths.get(path));
        if(p != null) {
            response.setSuccess(true);
            response.setMessage("Created folder " + relativePath);
        } else {
            throw new RuntimeException("Failed to create folder " + relativePath);
        }

        return response;
    }

    @Override
    public AppResponse createFolder(String relativePath) {
        Path p = null;
        AppResponse response = new AppResponse();
        try {
            String path = Toolbox.getAbsPath(fsUsrRoot,relativePath);
            p = Files.createDirectory(Paths.get(path));
            if(p !=null) {
                response.setResponseCode(ResponseCode.SUCCESS);
                response.setSuccess(true);
                response.setMessage("Created folder " + relativePath);
            } else {
                response.setResponseCode(ResponseCode.ERROR);
                response.setSuccess(false);
                response.setMessage("Failed to create folder " + relativePath);
            }
        } catch(IOException e){
            response.setSuccess(false);
            response.setMessage("Failed to create folder " + relativePath);

            response.setData(e.getClass().getSimpleName());
        }

        return response;
    }

    @Override
    public boolean saveFile(String filePath, String content) throws IOException {

        String path = Toolbox.getAbsPath(fsUsrRoot,filePath);

        File f = new File(path);
        if(!f.exists()) {
            f.createNewFile();
        }


        BufferedWriter writer = Files.newBufferedWriter(Paths.get(path),
                StandardCharsets.UTF_8, StandardOpenOption.TRUNCATE_EXISTING);
        writer.write(content);
        writer.flush();
        writer.close();

        return true;
    }

    @Override
    public List<String> searchMySpace(String username, String q) throws IOException {
        String path = fsUsrRoot + "/" + username;
        TreeNode root = (new DirectoryWalker(this.fsUsrRoot)).walk(path);
        return this.search(root, q);
    }

    @Override
    public void createUserRoot(String username) throws IOException {
        String path = Toolbox.getAbsPath(fsUsrRoot, username);
        Files.createDirectory(Paths.get(path));
    }

    @Override
    public AppResponse uploadFile(String owner, String path, MultipartFile file) {

        String absPath = Toolbox.getAbsPath(path, file.getOriginalFilename());
        File f = new File(absPath);
        AppResponse response = new AppResponse();
        try {
            file.transferTo(f);
            response.setSuccess(true);
        } catch (IOException e) {
            response.setSuccess(false);
            e.printStackTrace();
        }finally {
            response.setData(f.getName());
        }

        return response;
    }

    private List<String> search(TreeNode node, String q) throws IOException {
        List<String> paths = new ArrayList<>();
        String absPath = "", path = "";

        if(node.hasChildren()) {
            for(TreeNode n : node.getChildren()){
                path    = ((HashMap<String, Object>) n.getData()).get("path").toString();

                List<String> list = search(n,q);
                if(list.size()>0)
                    paths.addAll(list);
            }
        } else {
            path = ((HashMap<String, Object>) node.getData()).get("path").toString();
            absPath = fsUsrRoot + "/" + path;

            if(!Files.isDirectory(Paths.get(absPath))) {
                String content = this.read(absPath);
                if(content.toLowerCase().contains(q.toLowerCase())) {
                    paths.add(path);
                }
            }
        }

        return paths;
    }


    @Override
    public void deleteUserFile(String fileName) throws IOException{
        deleteUserFile(fileName,true);
    }

    @Override
    public void deleteUserFile(String fileName, boolean archive) throws IOException {

        String absPath = Toolbox.getAbsPath(fsUsrRoot, fileName);
        if(!archive) {
            Files.delete(Paths.get(absPath));
            return;
        }

        String archivePath = Toolbox.getAbsPath(this.fsArchive, fileName);

        File archiveFile = new File(archivePath);
        if(archiveFile.isDirectory() && archiveFile.listFiles().length>0) {
            Toolbox.archive(Toolbox.getAbsPath(fsUsrRoot, fileName), archivePath);
        }

        if( Files.exists(Paths.get(absPath)) ) {
            Files.delete(Paths.get(absPath));
        }
    }

    @Override
    public AppResponse rename(String path, String name) throws FileNotFoundException, FileAlreadyExistsException {

        String absPath = Toolbox.getAbsPath(fsUsrRoot, path);

        if(Files.exists(Paths.get(absPath))){

            File existingFile = new File(absPath);
            String destinationPath = StringUtils.substringBeforeLast(absPath,"/") + "/" + name;
            File destinationFile = new File(destinationPath);
            if(Files.exists(Paths.get(destinationPath))){
                throw new FileAlreadyExistsException("Path already exists " + destinationPath);
            } else {
                if(!existingFile.renameTo(destinationFile)){
                    throw new RuntimeException("Failed to rename " + path);
                };
            }
        }else {
            throw new FileNotFoundException("File not found " + path);
        }


        return AppResponse.error();
    }

}
