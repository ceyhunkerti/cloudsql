package csql.util;


import csql.model.util.TreeNode;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DirectoryWalker {

    private String root;

    public DirectoryWalker(String root ) {
        this.root = root;
    }

    public DirectoryWalker() {

    }

    public TreeNode walk( String path ) {

        TreeNode node;
        File file = new File(path);

        HashMap<String,Object> parentData = new HashMap<String,Object>();
        parentData.put("path",path.replaceFirst(this.root,""));

        TreeNode parent = new TreeNode(file.getName(),!file.isDirectory(),parentData);

        File[] list = file.listFiles();

        if (list == null)
            return parent;

        for (File f : list) {
            if (f.isDirectory()) {
                node = walk(f.getAbsolutePath());
            }
            else {
                HashMap<String,String> childData = new HashMap<String,String>();
                String absPath = f.getAbsolutePath();
                String relativePath = absPath.replaceFirst(this.root,"");
                childData.put("path",relativePath);
                node = new TreeNode(f.getName(),true,childData);
            }

            parent.addChild(node);
        }

        return parent;
    }

    public List<File> flatten(String path) {
        List<File> list = new ArrayList<File>();

        File file = new File(path);
        list.add(file);

        if(file.isDirectory()) {
            for(File f : file.listFiles()){
                list.addAll(flatten(f.getAbsolutePath()));
            }
        }

        return list;
    }

    public List<String> getFlatPaths(String path){
        List<File> files = this.flatten(path);
        List<String> paths = new ArrayList<String>();

        for(File file : files) {
            paths.add(file.getAbsolutePath());
        }

        return paths;
    }

}
