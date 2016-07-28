package csql.service;

import csql.model.util.AppResponse;
import csql.model.util.TreeNode;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.util.List;

public interface FileSystemService {

    public TreeNode getUserRoot(String username);

    public String readFile(String absPath) throws IOException;

    public AppResponse delete(String relativePath, boolean force) throws IOException;

    public AppResponse createFile(String path) throws IOException;

    public AppResponse createFolder(String path);

    boolean saveFile(String path, String content) throws IOException;

    public List<String> searchMySpace(String username, String q) throws IOException;

    public void createUserRoot(String username) throws IOException;

    public AppResponse uploadFile(String owner, String path, MultipartFile file);

    public void deleteUserFile(String fileName) throws IOException;

    public void deleteUserFile(String fileName, boolean archive) throws IOException;

    public AppResponse rename(String path, String name) throws FileNotFoundException, FileAlreadyExistsException;
}
