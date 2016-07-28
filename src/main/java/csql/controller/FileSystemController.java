package csql.controller;


import csql.exception.FilePathAccessDeniedException;
import csql.exception.InvalidValueException;
import csql.security.CSQLUserContext;
import csql.util.security.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import csql.model.util.AppResponse;
import csql.service.FileSystemService;
import csql.model.util.TreeNode;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.util.List;

@Controller
@RequestMapping("/file")
public class FileSystemController {


    @Autowired
    private FileSystemService fileSystemService;

    @Autowired
    private Validator validator;

    @Autowired
    private CSQLUserContext CSQLUserContext;

    @RequestMapping(value="/my_files/root", method = RequestMethod.GET)
    @ResponseBody
    public TreeNode getUsrRoot() {
        return fileSystemService.getUserRoot(CSQLUserContext.getCurrentUser().getUsername());
    }

    /**
     * read file content fully
     * @param f file path
     * @return
     * @throws IOException
     * @throws InvalidValueException
     * @throws FilePathAccessDeniedException
     */
    @RequestMapping(value="/read", method = RequestMethod.GET)
    @ResponseBody
    public String readFile(@RequestParam String f) throws IOException,InvalidValueException,FilePathAccessDeniedException {

        String username = CSQLUserContext.getCurrentUser().getUsername();

        if(validator.isValidAndUserHasAccess(username,f)){
            return fileSystemService.readFile(f);
        }

        return null;
    }

    /**
     * Delete a file/folder by path
     * @param path
     * @return AppResponse generic response object
     * @throws IOException
     * @throws InvalidValueException
     * @throws FilePathAccessDeniedException
     */
    @RequestMapping(value="/my_files", method = RequestMethod.DELETE)
    @ResponseBody
    public AppResponse delete(@RequestParam String path) throws IOException, InvalidValueException,FilePathAccessDeniedException {

        String username = CSQLUserContext.getCurrentUser().getUsername();
        if(validator.isValidAndUserHasAccess(username, path)){
            return fileSystemService.delete(path, true);
        }

        return AppResponse.error();
    }

    @RequestMapping(value="/my_files/create_file", method = RequestMethod.POST)
    @ResponseBody
    public AppResponse createFile(@RequestParam String path) throws IOException,InvalidValueException,FilePathAccessDeniedException {


        String username = CSQLUserContext.getCurrentUser().getUsername();

        if(validator.isValidAndUserHasAccess(username, path)) {
            return fileSystemService.createFile(path);
        }

        return AppResponse.error();
    }

    @RequestMapping(value="/my_files/create_folder", method = RequestMethod.POST)
    @ResponseBody
    public AppResponse newFolder(@RequestParam String path) throws IOException ,InvalidValueException,FilePathAccessDeniedException{

        String username = CSQLUserContext.getCurrentUser().getUsername();
        if(validator.isValidAndUserHasAccess(username,path)){
            return fileSystemService.createFolder(path);
        }

        return AppResponse.error();

    }

    @RequestMapping(value="/my_files/rename", method = RequestMethod.PUT)
    @ResponseBody
    public AppResponse rename(@RequestParam String path, @RequestParam String name) throws IOException,FileNotFoundException, FileAlreadyExistsException {

        String username = CSQLUserContext.getCurrentUser().getUsername();
        if(validator.isValidAndUserHasAccess(username,path)){
            return fileSystemService.rename(path, name);
        }

        return AppResponse.error();
    }


    @RequestMapping(value="/my_files/save_content", method = RequestMethod.POST)
    @ResponseBody
    public void saveFile(@RequestParam String path,
                         @RequestBody String content) throws IOException,InvalidValueException,FilePathAccessDeniedException {

        String username = CSQLUserContext.getCurrentUser().getUsername();

        if(validator.isValidAndUserHasAccess(username, path)) {
            fileSystemService.saveFile(path, content);
        }
    }


    @RequestMapping(value="/my_files/search", method = RequestMethod.GET)
    @ResponseBody
    public List<String> searchMySpace(@RequestParam String q) throws IOException {
        String username = CSQLUserContext.getCurrentUser().getUsername();
        return fileSystemService.searchMySpace(username, q);
    }


    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public AppResponse onTaskTemplateUpload( @RequestParam("file") MultipartFile file,
                                                 @RequestParam String path) throws IOException {


        String username = CSQLUserContext.getCurrentUser().getUsername();

        if(validator.isValidAndUserHasAccess(username,path)) {
            return fileSystemService.uploadFile(username,path,file);
        }

        return null;

    }

}
